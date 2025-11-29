import { Component, inject, OnInit } from '@angular/core';
import { MovementService } from '../../core/services/movement.service';
import { ProductService } from '../../core/services/product.service';
import { BranchSessionService } from '../../core/services/branch-session.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'movement-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './movement-list.html'
})
export class MovementList implements OnInit {

  private movementService = inject(MovementService);
  private productService = inject(ProductService);
  private branchSession = inject(BranchSessionService);

  displayedColumns = [
    'createdAt',
    'product',
    'movementType',
    'quantity',
    'createdBy',
    'description'
  ];

  data: any[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const currentBranch = this.branchSession.getBranch();

    this.movementService.getAll().subscribe((movements: any[]) => {

      // Filtrar movimientos por sucursal
      const filteredByBranch = movements.filter(m => m.branchId === currentBranch);

      // Ordenar por fecha
      filteredByBranch.sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Cargar productos
      this.productService.getAll().subscribe((products: any[]) => {

        this.data = filteredByBranch.map((m: any) => ({
          ...m,
          productName: products.find(p => p.id === m.productId)?.name ?? '—'
        }));
      });
    });
  }
}
