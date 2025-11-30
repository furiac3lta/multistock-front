import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { Product } from '../../core/models/product.model';
import { StockService } from '../../core/services/stock.service';
import { MovementType } from '../../core/models/movement-type.enum';

@Component({
  selector: 'app-product-adjust',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './product-adjust.html'
})
export class ProductAdjust {

  form = new FormGroup({
    mode: new FormControl<'DIRECT' | 'INCREASE' | 'DECREASE'>('INCREASE', Validators.required),
    quantity: new FormControl<number | null>(null, [Validators.min(1)]),
    newValue: new FormControl<number | null>(null, [Validators.min(0)]),
    description: new FormControl<string | null>(''),
  });

  username = 'admin';

  constructor(
    public dialogRef: MatDialogRef<ProductAdjust>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private service: StockService
  ) {}

  save() {
    if (this.form.invalid) return;

    const mode = this.form.value.mode!;
    const desc = this.form.value.description ?? '';
    const current = this.data.stock;

    // ===================================================
    //               AJUSTE DIRECTO (SET VIRTUAL)
    // ===================================================
    if (mode === 'DIRECT') {

      const newValue = this.form.value.newValue!;
      if (newValue == null) return;

      const diff = newValue - current;

      // No cambia nada
      if (diff === 0) {
        this.dialogRef.close(true);
        return;
      }

      const type = diff > 0 ? MovementType.INCREASE : MovementType.DECREASE;
      const qty = Math.abs(diff);

      if (type === MovementType.DECREASE && qty > current) {
        alert('No puedes dejar stock negativo');
        return;
      }

      this.service.moveStock(
        this.data.id!,
        qty,
        type,
        desc,
        this.username
      ).subscribe(() => this.dialogRef.close(true));

      return;
    }

    // ===================================================
    //      AJUSTE NORMAL (INCREASE / DECREASE)
    // ===================================================
    const qty = this.form.value.quantity!;
    if (qty <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    if (mode === 'DECREASE' && qty > current) {
      alert('No puedes retirar más stock del que hay');
      return;
    }

    this.service.moveStock(
      this.data.id!,
      qty,
      mode as MovementType,
      desc,
      this.username
    ).subscribe(() => this.dialogRef.close(true));
  }
}
