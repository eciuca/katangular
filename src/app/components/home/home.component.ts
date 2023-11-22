import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HomeService, Link } from '@kt/components/home/home.service';

@Component({
  selector: 'kt-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  krapiLinks$: Observable<Link[]>

  constructor(private homeService: HomeService) {
    this.krapiLinks$ = this.homeService.getKrapiLinks();
  }
}
