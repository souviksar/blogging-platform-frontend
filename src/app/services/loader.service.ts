import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading: WritableSignal<boolean> = signal(false); // Signal for managing loading state

  startLoading(): void {
    this.isLoading.set(true);
  }

  stopLoading(): void {
    this.isLoading.set(false);
  }
}
