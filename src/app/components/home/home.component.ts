import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from 'rxjs';
import {KrapiService} from '@kt/shared/krapi.service';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {map} from 'rxjs/operators';

type Link = {
  name: string;
  href: string;
}
@Component({
  selector: 'kt-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  krapiLinks$: Observable<Link[]>

  constructor(private krapiService: KrapiService) {
    this.krapiLinks$ = this.krapiService.getKrapiResources()
      .pipe(
        map(linksResponse => linksResponse._links),
        map(links => Object.keys(links).map(key => ({name: key, href: links[key].href})))
      );
  }
}
