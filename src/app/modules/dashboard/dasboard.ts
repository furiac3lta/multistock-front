import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { StockMovementService } from '../../core/services/stock-movement.service';
import { BranchService, Branch } from '../../core/services/branch.service';
import { BranchSessionService } from '../../core/services/branch-session.service';

import Chart from 'chart.js/auto';
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

  // 👇 instancias de gráficos (para destruirlos después)
  private chartCategory: any;
  private chartBranch: any;
  private chartMovements: any;

  get branchName() {
    return this.branches.find(b => b.id === this.currentBranch)?.name ?? 'Sucursal';
  }

  ngOnInit() {
    this.loading = true;

    this.branchService.getAll().subscribe(branches => {
      this.branches = branches;

      const saved = this.branchSession.getBranch();
      this.currentBranch = branches.some(b => b.id === saved) ? saved : branches[0].id;

      this.loadDashboard(this.currentBranch);

      this.branchSession.branchId$.subscribe(id => {
        this.currentBranch = id;
        this.loadDashboard(id);
      });

      this.loading = false;
    });
  }

  loadDashboard(branchId: number) {
    this.loading = true;

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

      // 👇 ACÁ LLAMAMOS A LOS GRÁFICOS
      this.loadCharts(branchId);
    });
  }

  changeBranch(id: number) {
    this.currentBranch = id;
    this.branchSession.setBranch(id);
    this.loadDashboard(id);
  }

  // =====================================================
  //                    GRÁFICOS
  // =====================================================

  loadCharts(branchId: number) {

    // ⚠️ Destruir gráficos previos
    if (this.chartCategory) this.chartCategory.destroy();
    if (this.chartBranch) this.chartBranch.destroy();
    if (this.chartMovements) this.chartMovements.destroy();

    this.categoryService.getStockSummary(branchId).subscribe(r => {
      this.chartCategory = this.renderCategoryChart(r);
    });

    this.branchService.getSummary().subscribe(r => {
      this.chartBranch = this.renderBranchChart(r);
    });

    this.movementService.getLast30Days(branchId).subscribe(r => {
      const ordered = r.sort((a, b) =>
        new Date(a.day).getTime() - new Date(b.day).getTime()
      );

      this.chartMovements = this.renderMovementsChart(ordered);
    });

  }

  renderCategoryChart(data: any[]) {
    const colors = this.getChartColors();
    return new Chart('chartCategory', {
      type: 'bar',
      data: {
        labels: data.map(x => x.category),
        datasets: [{
          label: 'Stock total',
          data: data.map(x => x.totalStock),
          backgroundColor: colors.accent,
          borderRadius: 10,
          borderSkipped: false
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: colors.text }, grid: { display: false } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid } }
        }
      }
    });
  }

  renderBranchChart(data: any[]) {
    const colors = this.getChartColors();
    return new Chart('chartBranch', {
      type: 'pie',
      data: {
        labels: data.map(x => x.branch),
        datasets: [{
          label: 'Productos',
          data: data.map(x => x.count),
          backgroundColor: [
            '#f6a500', '#4ed8a2', '#6f7ff7', '#e44f6a', '#a33886'
          ],
          borderColor: colors.grid
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: { color: colors.text }
          }
        }
      }
    });
  }

  renderMovementsChart(data: any[]) {
    const colors = this.getChartColors();
    return new Chart('chartMovements', {
      type: 'line',
      data: {
        labels: data.map(x => x.day),
        datasets: [{
          label: 'Movimientos',
          data: data.map(x => x.count),
          borderColor: '#6f7ff7',
          backgroundColor: 'rgba(111, 127, 247, 0.18)',
          tension: 0.35,
          fill: true
        }]
      },
      options: {
        plugins: { legend: { labels: { color: colors.text } } },
        scales: {
          x: { ticks: { color: colors.text }, grid: { display: false } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid } }
        }
      }
    });
  }

  private getChartColors() {
    const styles = getComputedStyle(document.body);
    return {
      text: styles.getPropertyValue('--text-primary').trim(),
      grid: styles.getPropertyValue('--border-subtle').trim(),
      accent: styles.getPropertyValue('--color-amber').trim(),
    };
  }

}
