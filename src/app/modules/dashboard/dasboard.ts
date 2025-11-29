import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { StockMovementService } from '../../core/services/stock-movement.service';
import { BranchService, Branch } from '../../core/services/branch.service';
import { BranchSessionService } from '../../core/services/branch-session.service';

import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, CurrencyPipe, MatChipsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private movementService = inject(StockMovementService);
  private branchService = inject(BranchService);
  private branchSession = inject(BranchSessionService);

  branches: Branch[] = [];
  currentBranch = 1;
  loading = false;

  totalProductos = 0;
  totalCategorias = 0;
  valorInventario = 0;
  totalStock = 0;
  totalMovimientosHoy = 0;

  stockBajo: Product[] = [];
  ultimosProductos: Product[] = [];
  ultimosMovimientos: any[] = [];

  async ngOnInit() {

    this.loading = true;

    // 1️⃣ Cargar sucursales
    this.branchService.getAll().subscribe(branches => {
      this.branches = branches;

      const saved = this.branchSession.getBranch();
      this.currentBranch = branches.some(b => b.id === saved) ? saved : branches[0].id;

      // 2️⃣ Cargar datos según la sucursal actual
      this.loadDashboard(this.currentBranch);

      // 3️⃣ Escuchar cambios
      this.branchSession.branchId$.subscribe(id => {
        this.currentBranch = id;
        this.loadDashboard(id);
      });

      this.loading = false;
    });
  }

  loadDashboard(branchId: number) {

    this.loading = true;

    // 📌 Pedir productos directo al backend
    this.productService.getAll().subscribe(products => {
      const prods = products.filter(p => p.branchId === branchId);

      this.totalProductos = prods.length;
      this.valorInventario = prods.reduce((acc, p) => acc + p.salePrice * p.stock, 0);
      this.totalStock = prods.reduce((acc, p) => acc + p.stock, 0);

      this.stockBajo = prods.filter(p => p.stock <= 5);

      this.ultimosProductos = [...prods]
        .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
        .slice(0, 5);

      this.categoryService.getAll().subscribe(cats => {
        this.totalCategorias = cats.length;
      });

      // 📌 Pedir movimientos directo al backend
      this.movementService.getAll().subscribe(movs => {

        const ids = prods.map(p => p.id);
        const filtered = movs.filter(m => ids.includes(m.productId));

        const today = new Date().toISOString().slice(0, 10);

        this.totalMovimientosHoy = filtered.filter(
          m => m.createdAt.startsWith(today)
        ).length;

        this.ultimosMovimientos = filtered
          .map(m => ({
            ...m,
            productName: prods.find(p => p.id === m.productId)?.name ?? '—'
          }))
          .sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);

        this.loading = false;
      });

    });

  }

  changeBranch(id: number) {
    this.currentBranch = id;
    this.branchSession.setBranch(id);
    this.loadDashboard(id);
  }
}
