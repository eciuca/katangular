import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '@kt/shared/student.service';
import {
  BehaviorSubject,
  debounce,
  debounceTime,
  forkJoin,
  mergeMap,
  min,
  Observable,
  of, take, tap,
  throttleTime,
  zip
} from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Student } from '@kt/model/student';
import { map, shareReplay } from 'rxjs/operators';
import { fromIterable } from 'rxjs/internal/observable/innerFrom';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'kt-students',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  refresh$ = new BehaviorSubject<number>(0);
  students$: Observable<Student[]>
  leastPresentNumberOfAttendencesAllYear$: Observable<number>;
  leastPresentStudent$: Observable<Student>;
  constructor(private studentService: StudentService) {
    const evenNumbers = fromIterable([2,4,8]);

    this.students$ = this.refresh$.pipe(
      tap(id => console.log('refreshing before throttle ' + id)),
      throttleTime(2000),
      tap(id => console.log('refreshing after throttle ' + id)),
      mergeMap(_ => this.studentService.getStudents()),
      shareReplay()
    );

    this.students$ = this.refresh$.pipe(
      tap(id => console.log('refreshing before throttle ' + id)),
      throttleTime(2000),
      tap(id => console.log('refreshing after throttle ' + id)),
      mergeMap(_ => this.studentService.getStudents()),
      shareReplay()
    );

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
      map(studentsWithAttendances => studentsWithAttendances.reduce((a,b) => a[1] < b[1] ? a : b)),
      map(([student, attendence]) => student)
    );
  }

  refresh() {
    this.refresh$.next(Math.random());
  }
}
