import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KrapiService } from '@kt/shared/krapi.service';

@Component({
  selector: 'kt-playground',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {

  constructor(private krapiService: KrapiService) {
  }

  trigger() {
    this.krapiService.getKrapiResourcesRaw()
      .subscribe(response => {
        console.log(response);
      })
  }
}
