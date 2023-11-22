import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '@kt/shared/student.service';
import { Observable } from 'rxjs';
import { Student } from '@kt/model/student';
import { StudentComponent } from '@kt/components/students/student/student.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'kt-student-details',
  standalone: true,
  imports: [CommonModule, StudentComponent, MatCardModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent {

  student$: Observable<Student> | undefined;
  constructor(private studentService: StudentService) {
  }
  @Input()
  set studentId(value: number) {
    this.student$ = this.studentService.getStudent(value);
  }

}
