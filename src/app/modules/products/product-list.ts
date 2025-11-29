import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductForm } from './product-form';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';

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

  displayedColumns = [
    'name', 'sku', 'stock', 'costPrice', 'salePrice', 'category', 'actions'
  ];

  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  openCreate() {
    this.dialog.open(ProductForm, {
      width: '420px',
      data: null
    }).afterClosed().subscribe(done => {
      if (done) this.loadProducts();
    });
  }

  openEdit(product: Product) {
    this.dialog.open(ProductForm, {
      width: '420px',
      data: product
    }).afterClosed().subscribe(done => {
      if (done) this.loadProducts();
    });
  }

  adjust(product: Product) {
    import('./product-adjust').then(m => {
      this.dialog.open(m.ProductAdjust, {
        width: '420px',
        data: product
      }).afterClosed().subscribe(done => {
        if (done) this.loadProducts();
      });
    });
  }

  transfer(product: Product) {
    import('./product-transfer').then(m => {
      this.dialog.open(m.ProductTransfer, {
        width: '420px',
        data: product
      }).afterClosed().subscribe(done => {
        if (done) this.loadProducts();
      });
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar producto?')) return;
    this.productService.delete(id).subscribe(() => this.loadProducts());
  }
}
