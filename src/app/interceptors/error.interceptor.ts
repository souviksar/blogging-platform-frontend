import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { EState } from '../constants';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const authService: AuthService = inject(AuthService);
  const storageService: StorageService = inject(StorageService);
  const router: Router = inject(Router);

  // Define current state and blacklist URLs
  const currentState$ = new BehaviorSubject<string>(EState.Initial);
  const blacklistUrls = ['refresh-tokens', 'logout'];

  // Helper function to add the authorization token to the request headers
  const addTokenHeader = (req: HttpRequest<unknown>): HttpRequest<unknown> =>
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${storageService.getAccessToken()}`
      }
    });

  // Handle the 401 Unauthorized error by refreshing the token
  const handle401 = (): Observable<HttpEvent<unknown>> => {
    if (currentState$.getValue() === EState.Initial) {
      currentState$.next(EState.Holding);

      const refreshToken = storageService.getRefreshToken(); // Ensure you use the correct method to retrieve the refresh token

      // If a refresh token is available, attempt to refresh the access token
      if (refreshToken) {
        return authService.refreshTokens({ refreshToken: refreshToken }).pipe(
          tap((res) => {
            const { access, refresh } = res.data;
            storageService.saveTokens(access, refresh);
            currentState$.next(EState.Initial); // Reset state after refresh
          }),
          switchMap(() => next(addTokenHeader(request))), // Retry the original request with the new access token
          catchError((err: HttpErrorResponse) => {
            if (err.url?.includes(blacklistUrls[0])) {
              currentState$.next(EState.Abort);
              storageService.destroy(); // Clear stored data (e.g., tokens)
              router.navigate(['/auth/signin']); // Redirect to login page
              currentState$.next(EState.Initial);
            }
            return throwError(() => err); // Rethrow error if refresh fails
          })
        );
      }

      // If no refresh token is available, abort the process
      currentState$.next(EState.Abort);
      storageService.destroy(); // Clear stored data
      router.navigate(['/auth/signin']); // Redirect to login page
      currentState$.next(EState.Initial);
      return throwError(() => new Error('Missing refresh token'));
    }

    // If the request is already being handled or aborted, proceed with the next request
    return currentState$.pipe(
      filter((state) => state === EState.Initial || state === EState.Abort),
      take(1),
      switchMap(() => {
        if (currentState$.getValue() === EState.Abort) {
          return throwError(() => new Error('Request Aborted'));
        }
        return next(addTokenHeader(request)); // Proceed with the original request if no error
      })
    );
  };

  // Handle the HTTP request
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // If the error is 401 and not in the blacklist, handle the token refresh
      if (error.status === 401 && !blacklistUrls.some((url) => error.url?.match(url))) {
        return handle401();
      } else if (error.status === 403 || blacklistUrls.some((url) => error.url?.match(url))) {
        // Handle 403 errors and blacklist URLs
        currentState$.next(EState.Abort);
        storageService.destroy(); // Clear stored data
        router.navigate(['/auth/signin']); // Redirect to login page
        currentState$.next(EState.Initial);
      }
      return throwError(() => error); // Rethrow the error if it's not handled
    })
  );
};
