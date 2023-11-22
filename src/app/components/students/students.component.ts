import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '@kt/shared/student.service';
import { forkJoin, mergeMap, min, Observable, of, zip } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Student } from '@kt/model/student';
import { map, shareReplay } from 'rxjs/operators';
import { fromIterable } from 'rxjs/internal/observable/innerFrom';

@Component({
  selector: 'kt-students',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  students$: Observable<Student[]>
  leastPresentNumberOfAttendencesAllYear$: Observable<number>;
  leastPresentStudent$: Observable<Student>;
  constructor(private studentService: StudentService) {
    const evenNumbers = fromIterable([2,4,8]);

    this.students$ = this.studentService.getStudents();

    this.leastPresentNumberOfAttendencesAllYear$ = this.students$.pipe(
      mergeMap(student => {
        const attendences$ = student.map(student => student.allYearAttendance$);
        const afterForkJoin = forkJoin(attendences$)
        return afterForkJoin
      }),
      map(attendences => attendences.reduce((a,b) => a < b ? a : b, 1000000)),
    );

    this.leastPresentStudent$ = this.students$.pipe(
      mergeMap(student => {
        const attendences$ = student.map(student => zip(of(student), student.allYearAttendance$));
        const afterForkJoin = forkJoin(attendences$)
        return afterForkJoin;
      }),
      mergeMap(studentsWithAttendances => fromIterable(studentsWithAttendances)),
      min((a,b) => a[1] < b[1] ? -1 : 1),
      map(([student, attendence]) => student)
    );
  }
}
