import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClassValidator } from '@kt/components/students/student-form/class-validator.directive';

@Directive({
  selector: '[ktClassValidator]',
  standalone: true,
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => ClassValidatorDirective), multi: true }]
})
export class ClassValidatorDirective implements AsyncValidator {

  constructor(private validator: ClassValidator) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }

}
