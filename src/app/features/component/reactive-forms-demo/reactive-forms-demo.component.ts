import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AgeValidatorFn, DuplicateValidatorFn } from 'src/app/shared/validators/form-validators';

@Component({
  selector: 'app-reactive-forms-demo',
  templateUrl: './reactive-forms-demo.component.html',
  styleUrls: ['./reactive-forms-demo.component.css']
})
export class ReactiveFormsDemoComponent implements OnInit {
  public myForm!: FormGroup;

  get name(): FormControl | null {
    return this.myForm.get('name') as FormControl;
  }

  get email(): FormControl | null {
    return this.myForm.get('email') as FormControl;
  }

  get age(): FormControl | null {
    return this.myForm.get('age') as FormControl;
  }

  get aliases(): FormArray | null {
    return this.myForm.get('aliases') as FormArray;
  }

  addAlias(): void {
    this.aliases?.push(this.fb.control('',[Validators.required]));
  }

  removeAlias(index: number): void {
    this.aliases?.removeAt(index);
  }

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  createMyForm(): FormGroup {
    // return new FormGroup({
    //   'name': new FormControl(),
    //   'email': new FormControl(),
    //   'company': new FormControl(),
    //   'age': new FormControl(),
    //   'phone': new FormControl(),
    //   'location': new FormControl(),
    //   'gender': new FormControl()
    // });

    return this.fb.group({
      'name': ['hello world', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      'company': [''],
      'age': ['', [AgeValidatorFn(10)]],
      'phone': [''],
      'location': [''],
      'gender': [''],
      'isTest': [false],
      'aliases': this.fb.array([],[DuplicateValidatorFn()]),
    });
  }

  onSubmit(form: FormGroupDirective): void {
    if (form.valid) {
      const user : User = this.myForm.value as User;
      console.log(user);
      form.resetForm();
    }
  }
}
