import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NavigationComponent} from '@kt/components/navigation/navigation.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { debounceTime, Observable, of } from 'rxjs';
import { LoadingService } from '@kt/shared/loading.service';

@Component({
  selector: 'kt-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'katangular';
  loading$: Observable<Boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$
      .asObservable()
      .pipe(debounceTime(100));
  }
}
