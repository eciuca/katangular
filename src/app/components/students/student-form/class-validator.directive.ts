import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StudentService } from '@kt/shared/student.service';
import { map } from 'rxjs/operators';
import { Student } from '@kt/model/student';

@Injectable({
  providedIn: 'root'
})
export class ClassValidator implements AsyncValidator {

  constructor(private studentService: StudentService) {
  }
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.studentService.getStudents()
      .pipe(map(students => this.validateClassExists(students, control)))
  }

  private validateClassExists(students: Student[], control: AbstractControl) {
    const classIsValid = students.map(student => student.className).includes(control.value);
    console.log('classIsValid: ' + classIsValid);
    return classIsValid ? null : {
      classValidator: {valid: false},
      message: 'Class does not exist'
    };
  }
}
