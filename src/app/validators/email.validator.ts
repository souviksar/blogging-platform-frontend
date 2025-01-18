import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const email =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  };
};
