import { Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { AgeValidatorFn } from '../validators/form-validators';

@Directive({
  selector: '[ageValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: AgeValidatorDirective, multi: true }
  ]
})
export class AgeValidatorDirective implements Validator, OnInit {
  validator: ValidatorFn;

  constructor() { 
    this.validator = AgeValidatorFn(10);
  }
  
  ngOnInit(): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator(control);
  }
}
