import { AbstractControl, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(controlName: string, checkControlName: string): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(controlName);
    const checkControl = controls.get(checkControlName);
    if (checkControl?.errors && !checkControl.errors['passwordNoMatch']) {
      return null;
    }

    if (control?.value !== checkControl?.value) {
      controls.get(checkControlName)?.setErrors({ passwordNoMatch: true });
      return { passwordNoMatch: true };
    } else {
      controls.get(checkControlName)?.setErrors(null);
      return null;
    }
  };
}
