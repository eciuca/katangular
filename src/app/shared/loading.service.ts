import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading$ = new BehaviorSubject<boolean>(false);
  loadingUrls = new Map<string, boolean>();
  constructor() { }

  setLoading(url: string, loading: boolean) {
    if (!url) {
      throw new Error('Url is required');
    }

    if (loading) {
      this.loadingUrls.set(url, loading);
      this.loading$.next(true);
    } else if (this.loadingUrls.has(url)) {
      this.loadingUrls.delete(url);
    }

    const allRequestsFinished = this.loadingUrls.size === 0;
    if (allRequestsFinished) {
      this.loading$.next(false);
    }

  }
}
