import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const nonAuthGuard: CanActivateFn = () => {
  if (inject(StorageService).getAccessToken()) {
    inject(Router).navigate(['/dashboard']);
    return false;
  }
  return true;
};
