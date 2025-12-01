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
import { ExportService } from '../../core/services/export.service';

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
  private exportService = inject(ExportService);

  displayedColumns = [
    'name', 'sku', 'stock', 'costPrice', 'salePrice', 'category', 'actions'
  ];

  allProducts: Product[] = [];
  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();

    // Recargar al cambiar sucursal
    this.branchSession.branchId$.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts() {
    const branch = this.branchSession.getBranch();

    this.productService.getAll().subscribe({
      next: all => {
        this.allProducts = [...all];
        this.products = [...all.filter(p => p.branchId === branch)];
        console.log("🔄 PRODUCTOS RECARGADOS DESDE BACKEND:", this.products);
      }
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

    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }

  exportarExcel() {
    this.exportService.exportProducts(this.products);
  }

  exportarPDF() {
    this.exportService.exportProductsPdf(this.products);
  }

  triggerExcel() {
    document.getElementById('excelInput')?.click();
  }

  importarExcel(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    console.log("📂 Archivo Excel seleccionado:", file.name);

    import('../../core/excel-import.util').then(m => {
      m.readExcel(file).then(rows => {

        console.log("📄 EXCEL LEÍDO (rows):", rows);

        // 🔥 LOG DEL JSON EXACTO QUE SE ENVÍA AL BACKEND
        console.log("🚀 JSON FINAL A ENVIAR AL BACKEND:");
        console.log(JSON.stringify(rows, null, 2));

        // 🔥 Enviar al backend
        this.productService.importProducts(rows).subscribe({

          next: res => {
            console.log("✅ RESPUESTA BACKEND:", res);
            alert('Importación exitosa');
            this.loadProducts();
          },

          error: err => {
            console.error("❌ ERROR EN BACKEND:", err);
            console.log("❌ CUERPO ENVIADO:", rows);
            alert("Error al importar. Revisá consola.");
          }

        });

      });
    });
  }

}
