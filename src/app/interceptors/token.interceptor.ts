import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services';
import { Observable } from 'rxjs';

const blacklistUrls: string[] = []; // Define blacklistUrls as a string array

export const tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const storageService = inject(StorageService); // Inject the service
  const token = storageService.getAccessToken(); // Get the token

  // Check if the request URL is not blacklisted
  if (token && !blacklistUrls.some((url) => request.url.match(url))) {
    request = addTokenHeader(request, token); // Add the token to the request headers
  }

  return next(request); // Pass the request to the next handler
};

// Define addTokenHeader as a regular function since it's not part of a class
function addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token // Correct header case
    }
  });
}
