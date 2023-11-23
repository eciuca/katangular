import { Component, Input, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '@kt/shared/student.service';
import { Observable } from 'rxjs';
import { Student } from '@kt/model/student';
import { StudentComponent } from '@kt/components/students/student/student.component';
import { MatCardModule } from '@angular/material/card';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kt-student-details',
  standalone: true,
  imports: [CommonModule, StudentComponent, MatCardModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent {
  // studentIdValue: WritableSignal<number> = signal(-1);
  student: WritableSignal<Student | undefined> = signal(undefined);

  constructor(private studentService: StudentService) {
  }
  @Input()
  set studentId(value: number) {
    this.studentService.getStudent(value)
      .subscribe((student) => this.student.set(student));
  }

}
