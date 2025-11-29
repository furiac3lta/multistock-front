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

// 🔥 USAR EL ENUM GLOBAL
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
    type: new FormControl<'INCREASE' | 'DECREASE' | 'SET'>('INCREASE', Validators.required),
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

    const type = this.form.value.type!;
    const desc = this.form.value.description ?? '';
    const currentStock = this.data.stock;

    // -------------------------
    //       SET MODE
    // -------------------------
    if (type === 'SET') {

      const newValue = this.form.value.newValue;

      if (newValue == null || newValue < 0) return;

      const diff = newValue - currentStock;

      if (diff === 0) return this.dialogRef.close(true);

      const movementType =
        diff > 0 ? MovementType.INCREASE : MovementType.DECREASE;

      if (movementType === MovementType.DECREASE && Math.abs(diff) > currentStock) {
        alert('No puedes dejar el stock en negativo');
        return;
      }

      this.service.moveStock(
        this.data.id!,
        Math.abs(diff),
        movementType,
        desc,
        this.username
      ).subscribe(() => this.dialogRef.close(true));

      return;
    }

    // -------------------------
    //   INCREASE / DECREASE
    // -------------------------
    const quantity = this.form.value.quantity!;

    if (quantity <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    if (type === 'DECREASE' && quantity > currentStock) {
      alert('No puedes retirar más stock del disponible');
      return;
    }

    this.service.moveStock(
      this.data.id!,
      quantity,
      type as MovementType,
      desc,
      this.username
    ).subscribe(() => this.dialogRef.close(true));
  }
}
