import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { EErrors } from 'src/app/constants';
import { ISignupRequest } from 'src/app/interfaces';
import { AuthService, StorageService } from 'src/app/services';
import { confirmPasswordValidator, emailValidator, noWhitespaceValidator } from 'src/app/validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy {
  router = inject(Router);
  fb = inject(FormBuilder);
  storageService: StorageService = inject(StorageService);
  authService: AuthService = inject(AuthService);
  toastr: ToastrService = inject(ToastrService);
  errors = EErrors;
  signupForm = this.fb.group(
    {
      name: ['', [noWhitespaceValidator(), Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [emailValidator()]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validators: confirmPasswordValidator('password', 'confirmPassword')
    }
  );
  inputType1: string = 'password';
  inputType2: string = 'password';
  private destroySubscription$: Subject<void> = new Subject();

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const payload: ISignupRequest = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };

    this.authService
      .signup(payload)
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.router.navigate(['/']);
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
