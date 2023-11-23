import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from '@kt/shared/student.service';
import { StudentDto } from '@kt/model/krapi';

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
              private studentService: StudentService) {
  }

  firstNameControl = this.fb.control<string>('');
  lastNameControl = this.fb.control<string>('');
  classControl = this.fb.control<string>('');
  sectionControl = this.fb.control<number>(0);
  rollIdControl = this.fb.control<number>(0);

  saveStudent() {
    const newStudent: StudentDto = {
      name: this.firstNameControl.value!,
      title: this.lastNameControl.value!,
      className: this.classControl.value!,
      section: this.sectionControl.value!.toString(),
      rollId: this.rollIdControl.value!,
    };
    this.studentService.saveStudent(newStudent)
      .subscribe((student) => this.submit.emit(student));
  }
}
