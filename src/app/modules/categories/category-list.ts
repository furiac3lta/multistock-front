import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CategoryForm } from './category-form';
import { BranchSessionService } from '../../core/services/branch-session.service';
@Component({
  selector: 'category-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './category-list.html',
})
export class CategoryList implements OnInit {

  private service = inject(CategoryService);
  private dialog = inject(MatDialog);
  private branchSession = inject(BranchSessionService);

  displayedColumns = ['name', 'description', 'active', 'actions'];
  data: Category[] = [];

ngOnInit() {
  this.loadData();
  this.branchSession.branchId$.subscribe(() => this.loadData());
}

loadData() {
  this.service.getAll().subscribe(resp => {
    // categorías son globales, no se filtran por sucursal
    this.data = resp;
  });
}


  openCreate() {
    const dialogRef = this.dialog.open(CategoryForm, {
      width: '400px',
      data: null
    });
    dialogRef.afterClosed().subscribe(r => r && this.loadData());
  }

  openEdit(category: Category) {
    const dialogRef = this.dialog.open(CategoryForm, {
      width: '400px',
      data: category
    });
    dialogRef.afterClosed().subscribe(r => r && this.loadData());
  }

  delete(id: number) {
    if (!confirm('¿Eliminar categoría?')) return;
    this.service.delete(id).subscribe(() => this.loadData());
  }
}
