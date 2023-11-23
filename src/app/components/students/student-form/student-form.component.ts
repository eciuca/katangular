import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from '@kt/shared/student.service';
import { StudentDto } from '@kt/model/krapi';
import { ClassValidator } from '@kt/components/students/student-form/class-validator.directive';

@Component({
  selector: 'kt-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatInputModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  @Output() submit = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              private classValidator: ClassValidator) {
  }

  studentForm = this.fb.group({
    name: this.fb.control<string>('', [Validators.minLength(2)]),
    title: this.fb.control<string>(''),
    className: this.fb.control<NonNullable<string>>('', {
      asyncValidators: [
        this.classValidator.validate.bind(this.classValidator)
      ],
      updateOn: 'blur'
    }),
    section: this.fb.control<string>(''),
    rollId: this.fb.control<number>(0),
  });

  saveStudent() {
    const name = this.studentForm.get('name') as FormControl<string>;
    const title = this.studentForm.get('title') as FormControl<string>;
    const className = this.studentForm.get('className') as FormControl<string>;
    const section = this.studentForm.get('section') as FormControl<string>;
    const rollId = this.studentForm.get('rollId') as FormControl<number>;
    const newStudent: StudentDto = {
      name: name.value,
      title: title.value,
      className: className.value,
      section: section.value,
      rollId: rollId.value
    }
    this.studentService.saveStudent(newStudent)
      .subscribe((student) => this.submit.emit(student));
  }
}
