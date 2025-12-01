import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { SnackbarService } from '../../shared/snackbar.service';
import { tap } from 'rxjs/operators';

export const snackbarInterceptor: HttpInterceptorFn = (req, next) => {

  const snackbar = inject(SnackbarService);

  return next(req).pipe(
    tap({
      next: (event) => {
        // Mostrar snackbar de éxito solo cuando es POST, PUT o DELETE
        if (event instanceof HttpResponse) {
          if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
            snackbar.success('Operación realizada con éxito');
          }
        }
      },

      error: (error: HttpErrorResponse) => {
        const msg =
          error.error?.message ||
          error.error ||
          'Ocurrió un error inesperado';

        snackbar.error(msg);
      }
    })
  );
};
