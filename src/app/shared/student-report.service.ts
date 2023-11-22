import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getEmbeddedField, HALResponse } from '@kt/model/HALResponse';
import { StudentDto } from '@kt/model/krapi';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Student } from '@kt/model/student';
import { StudentReport } from '@kt/model/student-report';

@Injectable({
  providedIn: 'root'
})
export class StudentReportService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }


  getStudentReports(studentId: number) {
    return this.httpClient.get<HALResponse<StudentReport[]>>(`${this.apiUrl}/studentreports/search/by-student-id`, {
      params: { studentId }
    }).pipe(
      map(response => getEmbeddedField<StudentReport[]>(response, 'studentReports', []))
  );
  }
}
