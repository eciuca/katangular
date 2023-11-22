import { Injectable } from '@angular/core';
import { KrapiService } from '@kt/shared/krapi.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type Link = {
  name: string;
  href: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private krapiService: KrapiService) { }

  getKrapiLinks(): Observable<Link[]> {
    return this.krapiService.getKrapiResources().pipe(
      map(linksResponse => linksResponse._links),
      map(links => this.toLinkArray(links))
    );
  }

  private toLinkArray(links: any): Link[] {
    return Object.keys(links).map(key => {
      return {
        name: key,
        href: this.removeOptionalParameters(links[key].href)
      }
    });
  }

  private removeOptionalParameters(linkHref: string): string {
    return linkHref.replace(/{.*}/g, '');
  }
}
