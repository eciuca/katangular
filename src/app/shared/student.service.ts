import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { getEmbeddedField, HALResponse } from '@kt/model/HALResponse';
import { StudentDto } from '@kt/model/krapi';
import { delay, map, shareReplay } from 'rxjs/operators';
import { Student } from '@kt/model/student';
import { StudentReportService } from '@kt/shared/student-report.service';
import { StudentReport } from '@kt/model/student-report';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient,
              private studentReportService: StudentReportService) {

  }

  getStudents() {
    // if (Math.random() > 0.4) {
    //   console.error('Something went wrong');
    //   throw new Error('Something went wrong');
    // }
    return this.httpClient.get<HALResponse<StudentDto[]>>(`${this.apiUrl}/students`).pipe(
      map(response => getEmbeddedField<StudentDto[]>(response, 'students', [])),
      map(studentDtos => studentDtos.map(studentDto => this.toStudent(studentDto))),
      shareReplay()
    );
  }

  getStudent(id: number) {
    return this.httpClient.get<StudentDto>(`${this.apiUrl}/students/${id}`).pipe(
      map(studentDto => this.toStudent(studentDto)),
      shareReplay()
    );
  }

  toStudent(studentDto: StudentDto): Student {
    const reports$ = this.studentReportService.getStudentReports(studentDto.id).pipe(shareReplay());
    const allYearAttendance$ = reports$.pipe(
      map(reports => this.sumAttendances(reports)));

    return {
      ...studentDto,
      reports$,
      allYearAttendance$
    }
  }

  private sumAttendances(reports: StudentReport[]) {
    return reports.map(report => report.classAttended).reduce((a, b) => a + b, 0);
  }
}
