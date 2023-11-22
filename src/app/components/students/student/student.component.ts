import { ChangeDetectionStrategy, Component, DoCheck, HostBinding, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '@kt/model/student';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'kt-student',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
  host: {
    '(click)': 'onHover($event)',
    'attr.aria-valuenow': 'value'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class StudentComponent implements DoCheck {
  value: number = 0;
  @Input() student!: Student;

  onHover(event: any) {
    console.log(event);
  }

  ngDoCheck(): void {
    // console.log('do check ' + this.student.name);
  }
}
