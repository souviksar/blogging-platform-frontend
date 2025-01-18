import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  if (!inject(StorageService).getAccessToken()) {
    inject(Router).navigate(['/auth/signin']);
    return false;
  }
  return true;
};
