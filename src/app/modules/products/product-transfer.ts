import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Product } from '../../core/models/product.model';
import { StockTransferService } from '../../core/services/stock-transfer.service';
import { BranchSessionService } from '../../core/services/branch-session.service';
import { BranchService, Branch } from '../../core/services/branch.service';

@Component({
  selector: 'app-product-transfer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './product-transfer.html'
})
export class ProductTransfer {

  private branchService = inject(BranchService);

  branches: Branch[] = [];

  form = new FormGroup({
    targetBranchId: new FormControl<number | null>(null, Validators.required),
    quantity: new FormControl<number>(1, [Validators.required, Validators.min(1)]),
    description: new FormControl<string>(''),
  });

  username = 'admin'; // cambiar cuando tengas auth real

  constructor(
    public dialogRef: MatDialogRef<ProductTransfer>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private transferService: StockTransferService,
    public branchSession: BranchSessionService
  ) {}

  ngOnInit() {
    this.branchService.getAll().subscribe(b => {
      this.branches = b.filter(x => x.id !== this.branchSession.getBranch());
    });
  }

  save() {
    if (this.form.invalid) return;

    // validación lógica de stock
    if (this.form.value.quantity! > this.data.stock) {
      alert('No puedes transferir más stock del disponible.');
      return;
    }

    const req = {
      sourceBranchId: this.branchSession.getBranch(),
      targetBranchId: this.form.value.targetBranchId!,
      productId: this.data.id!,
      quantity: this.form.value.quantity!,
      description: this.form.value.description ?? '',
      user: this.username
    };

    this.transferService.transfer(req).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error('ERROR TRANSFER:', err)
    });
  }
}
