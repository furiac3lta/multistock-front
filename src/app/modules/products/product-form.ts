import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { Product } from '../../core/models/product.model';
import { BranchSessionService } from '../../core/services/branch-session.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './product-form.html'
})
export class ProductForm {

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private branchSession = inject(BranchSessionService);
  private dialogRef = inject(MatDialogRef<ProductForm>);

  categories: any[] = [];

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    sku: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    stock: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)]
    }),

    costPrice: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)]
    }),

    salePrice: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)]
    }),

    categoryId: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required]
    }),

    active: new FormControl<boolean>(true, {
      nonNullable: true
    }),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product | null) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe(resp => this.categories = resp);

    if (this.data) {
      // Si es edición, cargamos todo
      this.form.patchValue(this.data);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) return;

    const value = this.form.value as Product;

    // 🔥 MULTISUCURSAL: siempre enviamos sucursal actual
    value.branchId = this.branchSession.getBranch();

    const request = this.data
      ? this.productService.update(this.data.id!, value)
      : this.productService.create(value);

    request.subscribe(() => this.dialogRef.close(true));
  }
}
