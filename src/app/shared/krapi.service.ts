import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {LinksResponse} from '@kt/model/HALResponse';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KrapiService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getKrapiResources(): Observable<LinksResponse> {
    return this.httpClient.get<LinksResponse>(`${this.apiUrl}/`);
  }

  getKrapiResourcesRaw(): Observable<HttpResponse<LinksResponse>> {
    return this.httpClient.get<LinksResponse>(`${this.apiUrl}/`, { observe: 'response' });

  }
}
