import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { catchError, debounceTime } from 'rxjs';
import { inject } from '@angular/core';
import { LoadingService } from '@kt/shared/loading.service';
import { map } from 'rxjs/operators';

export const progressBarInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.setLoading(req.url, true);

  return next(req).pipe(
    catchError(err => {
      loadingService.setLoading(req.url, false);
      throw err;
    }),
    map(event => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
        setTimeout( () => { // delay for visual feedback
          loadingService.setLoading(req.url, false);
        }, 2000);
      }
      return event;
    }));
};
