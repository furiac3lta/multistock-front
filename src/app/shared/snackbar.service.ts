import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {

  private snack = inject(MatSnackBar);

  success(msg: string) {
    this.snack.open(msg, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  error(msg: string) {
    this.snack.open(msg, 'Cerrar', {
      duration: 4000,
      panelClass: ['snackbar-error']
    });
  }

  info(msg: string) {
    this.snack.open(msg, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-info']
    });
  }
}
