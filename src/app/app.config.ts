import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { snackbarInterceptor } from './core/interceptors/snackbar.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // ⭐ Snackbar de Angular Material
    importProvidersFrom(MatSnackBarModule),

    provideHttpClient(
      withInterceptors([jwtInterceptor,
        snackbarInterceptor,loadingInterceptor
      ])
    )
  ]
};
