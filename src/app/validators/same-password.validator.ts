import { AbstractControl, ValidatorFn } from '@angular/forms';

export function samePasswordValidator(controlName: string, checkControlName: string): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(controlName);
    const checkControl = controls.get(checkControlName);

    if (checkControl?.errors && !checkControl.errors['passwordSame']) {
      return null;
    }

    if (control?.value === checkControl?.value) {
      controls.get(checkControlName)?.setErrors({ passwordSame: true });
      return { passwordSame: true };
    } else {
      return null;
    }
  };
}
