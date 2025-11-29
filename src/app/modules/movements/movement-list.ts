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

  allMovements: any[] = [];
  allProducts: any[] = [];
  data: any[] = [];

ngOnInit(): void {
  this.loadData();
  this.branchSession.branchId$.subscribe(() => this.loadData());
}

loadData() {
  const branch = this.branchSession.getBranch();

  this.productService.getAll().subscribe(products => {
    const prods = products.filter(p => p.branchId === branch);
    const ids = prods.map(p => p.id);

    this.movementService.getAll().subscribe(movements => {
      const filtered = movements.filter(m => ids.includes(m.productId));

      this.data = filtered.map(m => ({
        ...m,
        productName: prods.find(p => p.id === m.productId)?.name ?? '—'
      }));
    });
  });
}


  applyBranch(branchId: number) {

    const prods = this.allProducts.filter(p => p.branchId === branchId);
    const ids = prods.map(p => p.id);

    const movs = this.allMovements.filter(m => ids.includes(m.productId));

    movs.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    this.data = movs.map(m => ({
      ...m,
      productName: prods.find(p => p.id === m.productId)?.name ?? '—'
    }));
  }
}
