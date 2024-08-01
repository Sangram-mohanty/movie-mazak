import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {apiInterceptorInterceptor} from "./helpers/api-interceptor.interceptor";
import {provideStore} from '@ngrx/store';
import {store} from "./store/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([apiInterceptorInterceptor])), provideStore(store), provideStoreDevtools({      maxAge: 25,       logOnly: !isDevMode(),})]
};
