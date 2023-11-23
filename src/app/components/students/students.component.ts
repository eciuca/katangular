import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '@kt/shared/student.service';
import {
  BehaviorSubject, catchError, combineLatest, concat, concatAll,
  debounce,
  debounceTime,
  forkJoin,
  mergeMap,
  min,
  Observable,
  of, onErrorResumeNext, retry, take, tap,
  throttleTime, timer, withLatestFrom,
  zip
} from 'rxjs';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Student } from '@kt/model/student';
import { map, shareReplay } from 'rxjs/operators';
import { fromIterable } from 'rxjs/internal/observable/innerFrom';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentComponent } from '@kt/components/students/student/student.component';
import { StudentFormComponent } from '@kt/components/students/student-form/student-form.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'kt-students',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, StudentComponent, StudentFormComponent, MatGridListModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements AfterViewInit {

  @ViewChild(MatCard) studentComponent!: MatCard;

  refresh$ = new BehaviorSubject<number>(0);
  students$ = new BehaviorSubject<Student[]>([])
  leastPresentNumberOfAttendencesAllYear$!: Observable<number>;
  leastPresentStudent$!: Observable<Student>;
  constructor(private studentService: StudentService, private cd: ChangeDetectorRef) {
    // this.combinationExamples();
    this.loadStudentsData();
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit');
    // console.log('studentComponent', this.studentComponent);
    // this.studentComponent.appearance = 'outlined';
    // this.cd.detectChanges();
  }

  private loadStudentsData() {
    this.refresh$
      .pipe(throttleTime(2000))
      .subscribe(_ => {
        this.studentService.getStudents()
          .pipe(retry(3))
          .subscribe(students => {
            console.log('Fetched students!');
            this.students$.next(students);
          });
      });

    this.leastPresentNumberOfAttendencesAllYear$ = this.students$.pipe(
      mergeMap(student => {
        const attendences$ = student.map(student => student.allYearAttendance$);
        const afterForkJoin = forkJoin(attendences$)
        return afterForkJoin
      }),
      map(attendences => attendences.reduce((a, b) => a < b ? a : b, 1000000)),
    );

    this.leastPresentStudent$ = this.students$.pipe(
      mergeMap(student => {
        const attendences$ = student.map(student => zip(of(student), student.allYearAttendance$));
        const afterForkJoin = forkJoin(attendences$)
        return afterForkJoin;
      }),
      map(studentsWithAttendances => studentsWithAttendances.reduce((a, b) => a[1] < b[1] ? a : b)),
      map(([student, attendence]) => student)
    );
  }

  private combinationExamples() {
    const student1$ = this.studentService.getStudent(1).pipe(shareReplay());
    const student2$ = this.studentService.getStudent(2).pipe(shareReplay());
    let timer$ = timer(0, 1000)
      .pipe(tap(time => console.log('time', time)))

    zip(timer$, student1$, student2$)
      .subscribe(([time, student1, student2]) => {
        console.log('zip(' + time + ', ' + student1.id + ', ' + student2.id + ')');
      });

    //
    // combineLatest([timer$, student1$, student2$])
    //   .subscribe(([time, student1, student2]) => {
    //     console.log('combineLatest(' + time + ', ' + student1.id + ', ' + student2.id + ')');
    //   });

    // timer$.pipe(
    //   withLatestFrom(student1$, student2$)
    // )
    //   .subscribe(([time, student1, student2]) => {
    //     console.log('combineLatest(' + time + ', ' + student1.id + ', ' + student2.id + ')');
    //   });


    concat(timer$.pipe(take(5)), student1$, student2$)
      .subscribe(value => {
        console.log('concat(' + typeof (value) === 'number' ? value.toString() : (<any>value)?.id + ')');
      });
  }

  refresh() {
    this.refresh$.next(Math.random());
  }
}
