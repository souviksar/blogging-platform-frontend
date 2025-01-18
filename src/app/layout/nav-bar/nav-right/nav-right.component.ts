// Angular Import
import { Component, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService, StorageService } from 'src/app/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent implements OnDestroy {
  // public props
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;
  private destroySubscription$: Subject<void> = new Subject();

  // constructor
  constructor(
    private authService: AuthService,
    private router: Router,
    public storageService: StorageService
  ) {
    this.visibleUserList = false;
    this.chatMessage = false;
  }

  // public method
  onChatToggle(friendID: number) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  signOut() {
    this.authService
      .logout({ refreshToken: this.storageService.getRefreshToken() })
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe({
        next: () => {
          this.storageService.destroy();
          this.router.navigate(['/auth/signin']);
        },
        error: () => {
          this.storageService.destroy();
          this.router.navigate(['/auth/signin']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next();
    this.destroySubscription$.complete();
  }
}
