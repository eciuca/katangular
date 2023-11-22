import { StudentDto } from '@kt/model/krapi';
import { Observable } from 'rxjs';
import { StudentReport } from '@kt/model/student-report';


export interface Student extends StudentDto {
  reports$: Observable<StudentReport[]>
  allYearAttendance$: Observable<number>
}
