import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { StockMovementService } from '../../core/services/stock-movement.service';
import { ProductService } from '../../core/services/product.service';
import { BranchSessionService } from '../../core/services/branch-session.service';

@Component({
  selector: 'movement-out',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './movement-out.html'
})
export class MovementOut implements OnInit {

  private productService = inject(ProductService);
  private movementService = inject(StockMovementService);
  private branchSession = inject(BranchSessionService);

  products: any[] = [];
  productId!: number;
  quantity: number = 1;
  description: string = '';
  username = 'admin';

  ngOnInit() {
    const branchId = this.branchSession.getBranch();

    this.productService.getAll().subscribe(products => {
      // Solo productos de la sucursal
      this.products = products.filter(p => p.branchId === branchId);
    });
  }

  save() {
    if (!this.productId || this.quantity <= 0) return;

    this.movementService.move(
      this.productId,
      this.quantity,
      'DECREASE',
      this.description,
      this.username
    ).subscribe(() => {
      alert("Salida registrada");
      this.productId = 0;
      this.quantity = 1;
      this.description = '';
    });
  }
}
