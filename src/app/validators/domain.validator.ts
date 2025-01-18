import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { emailValidator } from './email.validator';

export const emailDomainValidator = (): ValidatorFn => {
  const emailFn = emailValidator();
  // const domainFn = domainValidator();

  return (control: AbstractControl): ValidationErrors | null => {
    const emailErrors = emailFn(control);
    if (emailErrors) {
      return emailErrors;
    }
    // return domainFn(control);
    return null;
  };
};

// const domainValidator = (): ValidatorFn => {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const whitelistDomains = EWhitelistDomains;

//     if (whitelistDomains.includes(control.value.substring(control.value.lastIndexOf('@') + 1))) {
//       return null;
//     }
//     return { invalidDomain: true };
//   };
// };
