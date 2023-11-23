import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { progressBarInterceptor } from '@kt/shared/progress-bar.interceptor';
import { provideStore } from '@ngrx/store';
import { ordersReducer } from '@kt/state/orders.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([progressBarInterceptor])),
    provideAnimations(),
    provideStore({
      orders: ordersReducer
    })
]
};
