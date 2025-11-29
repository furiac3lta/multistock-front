import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { TransferHistoryService } from '../../core/services/transfer-history.service';
import type { TransferHistory as TransferRecord } from '../../core/services/transfer-history.service';
import { BranchSessionService } from '../../core/services/branch-session.service';

@Component({
  selector: 'transfer-history',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './transfer-history.html',
  styleUrls: ['./transfer-history.scss'],
})
export class TransferHistoryComponent implements OnInit {

  private service = inject(TransferHistoryService);
  private branchSession = inject(BranchSessionService);

  displayedColumns = [
    'createdAt',
    'product',
    'quantity',
    'sourceBranch',
    'targetBranch',
    'createdBy',
    'description'
  ];

  data: TransferRecord[] = [];

  branches: Record<number, string> = {
    1: 'Sucursal Centro',
    2: 'Sucursal Norte',
    3: 'Sucursal Sur'
  };

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const branchId = this.branchSession.getBranch();

    this.service.getAll().subscribe(res => {

      // Filtrar movimientos donde participa la sucursal logueada
      this.data = res.filter(t =>
        t.sourceBranchId === branchId || t.targetBranchId === branchId
      );

      // Ordenar por fecha DESC
      this.data.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  }

  getBranchName(id: number): string {
    return this.branches[id] ?? '—';
  }
}
