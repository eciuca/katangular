import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { StudentDto } from '@kt/model/krapi';
import { StudentService } from '@kt/shared/student.service';
import { ClassValidatorDirective } from '@kt/components/students/student-form-template/class-validator.directive';

@Component({
  selector: 'kt-student-form-template',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, ClassValidatorDirective],
  templateUrl: './student-form-template.component.html',
  styleUrl: './student-form-template.component.css'
})
export class StudentFormTemplateComponent {

  @Output() submit = new EventEmitter<any>();

  name: string = '';
  title: string = '';
  className: string = '';
  section: string = '';
  rollId: number = 0;

  constructor(private studentService: StudentService) {
  }

  saveStudent() {
    const newStudent: StudentDto = {
      name: this.name,
      title: this.title,
      className: this.className,
      section: this.section,
      rollId: this.rollId
    }
    this.studentService.saveStudent(newStudent)
      .subscribe((student) => this.submit.emit(student));
  }
}
