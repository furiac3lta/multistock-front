import { inject } from '@angular/core';
import {
  HttpInterceptorFn
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loader = inject(LoadingService);

  // Mostrar loader solo si no es una imagen o archivo grande
  loader.show();

  return next(req).pipe(
    finalize(() => loader.hide())
  );
};
