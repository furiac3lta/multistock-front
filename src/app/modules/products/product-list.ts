import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductForm } from './product-form';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { BranchSessionService } from '../../core/services/branch-session.service';

@Component({
  selector: 'product-list',
  standalone: true,
  templateUrl: './product-list.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class ProductList implements OnInit {

  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private branchSession = inject(BranchSessionService);

  displayedColumns = [
    'name', 'sku', 'stock', 'costPrice', 'salePrice', 'category', 'actions'
  ];

  allProducts: Product[] = [];
  products: Product[] = [];

  ngOnInit(): void {
  this.loadProducts();

  // Escuchar sucursal y recargar SIEMPRE desde backend
  this.branchSession.branchId$.subscribe(() => {
    this.loadProducts();
  });
}

loadProducts() {
  const branch = this.branchSession.getBranch();

  this.productService.getAll().subscribe(all => {
    this.allProducts = all;
    this.products = all.filter(p => p.branchId === branch);
  });
}


  openCreate() {
    this.dialog.open(ProductForm, {
      width: '420px',
      data: null
    }).afterClosed().subscribe(done => {
      if (!done) return;

      this.productService.getAll().subscribe(all => {
        this.allProducts = all;
        this.products = all.filter(p => p.branchId === this.branchSession.getBranch());
      });
    });
  }

  openEdit(product: Product) {
    this.dialog.open(ProductForm, {
      width: '420px',
      data: product
    }).afterClosed().subscribe(done => {
      if (!done) return;

      this.productService.getAll().subscribe(all => {
        this.allProducts = all;
        this.products = all.filter(p => p.branchId === this.branchSession.getBranch());
      });
    });
  }

  adjust(product: Product) {
    import('./product-adjust').then(m => {
      this.dialog.open(m.ProductAdjust, {
        width: '420px',
        data: product
      }).afterClosed().subscribe(done => {
        if (!done) return;

        this.productService.getAll().subscribe(all => {
          this.allProducts = all;
          this.products = all.filter(p => p.branchId === this.branchSession.getBranch());
        });
      });
    });
  }

  transfer(product: Product) {
    import('./product-transfer').then(m => {
      this.dialog.open(m.ProductTransfer, {
        width: '420px',
        data: product
      }).afterClosed().subscribe(done => {
        if (!done) return;

        this.productService.getAll().subscribe(all => {
          this.allProducts = all;
          this.products = all.filter(p => p.branchId === this.branchSession.getBranch());
        });
      });
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar producto?')) return;

    this.productService.delete(id).subscribe(() => {

      this.productService.getAll().subscribe(all => {
        this.allProducts = all;
        this.products = all.filter(p => p.branchId === this.branchSession.getBranch());
      });

    });
  }
}
