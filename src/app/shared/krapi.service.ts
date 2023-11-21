import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LinksResponse} from '@kt/model/HALResponse';

@Injectable({
  providedIn: 'root'
})
export class KrapiService {

  constructor(private httpClient: HttpClient) { }

  getKrapiResources(): Observable<LinksResponse> {
    return this.httpClient.get<LinksResponse>('/krapi/');
  }
}
