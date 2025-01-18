import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { EErrors } from 'src/app/constants';
import { ISigninRequest } from 'src/app/interfaces';
import { AuthService, StorageService } from 'src/app/services';
import { emailValidator } from 'src/app/validators';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnDestroy {
  router = inject(Router);
  fb = inject(FormBuilder);
  storageService: StorageService = inject(StorageService);
  authService: AuthService = inject(AuthService);
  toastr: ToastrService = inject(ToastrService);
  errors = EErrors;
  signinForm = this.fb.group({
    email: ['', [emailValidator()]],
    password: ['', [Validators.required]],
    keepMeSignedIn: [false]
  });
  inputType: string = 'password';
  private destroySubscription$: Subject<void> = new Subject();

  signin() {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    const payload: ISigninRequest = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };

    this.authService
      .signin(payload)
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe({
        next: (res) => {
          this.storageService.setUserInfo(res.data.user, this.signinForm.value.keepMeSignedIn);
          this.storageService.setAccessToken(res.data.tokens.access, this.signinForm.value.keepMeSignedIn);
          this.storageService.setRefreshToken(res.data.tokens.refresh, this.signinForm.value.keepMeSignedIn);
          this.router.navigate(['/post']);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error['message']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next();
    this.destroySubscription$.complete();
  }
}
