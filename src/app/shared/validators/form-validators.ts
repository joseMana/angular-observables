import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export function AgeValidatorFn(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value < minAge) {
      return {
        ageValidator: 'Age is below ' + minAge + ' years old'
      };
    }

    return null;
  };
}

export function DuplicateValidatorFn(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const formArray = control as FormArray;

    if(formArray?.length > 1) {
      const valueList: Array<string> = [];
      for(let control of formArray.controls) {
        if(!control.value) {
          continue;
        }
        const lowerCaseValue = control.value.toLowerCase();
        const isExisting = valueList.findIndex( v => v === lowerCaseValue) >= 0;
        if(isExisting) {
          return {
            duplicate: true
          };
        }
        else {
          valueList.push(lowerCaseValue);
        }
      }
    }

    return null;
  };
}