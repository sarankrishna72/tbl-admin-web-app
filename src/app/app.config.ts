import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApiInterceptor } from './shared/interceptor/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
     {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true

    },
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ]
};
