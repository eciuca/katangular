import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KrapiService } from '@kt/shared/krapi.service';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { connect } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'kt-playground',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {

  connection$: WebSocketSubject<any> | null;
  RETRY_SECONDS = 10;
  constructor(private krapiService: KrapiService) {
    this.connection$ = this.connect();
    this.connection$.subscribe(x => {
      console.log('got data from websocket', x);
    })
  }

  connect() {
    if (this.connection$) {
      return this.connection$;
    }

    // return webSocket('ws://localhost:8080/websocket/stream');
    return webSocket('ws://localhost:4200/krapi/websocket');
  }

  send(data: any) {
    console.log('sending data', data);
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.error('Did not send data, open a connection first');
    }
  }

  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }
  ngOnDestroy() {
    this.closeConnection();
  }

  trigger() {
    this.krapiService.getKrapiResourcesRaw()
      .subscribe(response => {
        console.log(response);
      })
  }
}
