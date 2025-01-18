import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  const blacklistUrls: string[] = [
    // Example: environment.baseUrl + '/api/skip-loader'
  ];

  const isBlacklisted = blacklistUrls.some((url) => req.url.includes(url));

  if (!isBlacklisted) {
    loaderService.startLoading();

    return new Observable<HttpEvent<any>>((observer) => {
      const subscription = next(req).subscribe({
        next: (event) => {
          if (event instanceof HttpResponse) {
            loaderService.stopLoading();
            observer.next(event);
          }
        },
        error: (err) => {
          loaderService.stopLoading();
          observer.error(err);
        },
        complete: () => {
          loaderService.stopLoading();
          observer.complete();
        }
      });

      return () => {
        loaderService.stopLoading();
        subscription.unsubscribe();
      };
    });
  }

  return next(req);
};
