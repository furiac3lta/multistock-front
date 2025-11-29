import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TransferHistoryService, TransferRecord } from '../../core/services/transfer-history.service';
import { BranchSessionService } from '../../core/services/branch-session.service';

@Component({
  selector: 'transfer-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './transfer-history.html',
  styleUrls: ['./transfer-history.scss']
})
export class TransferHistoryComponent implements OnInit {

  private transferService = inject(TransferHistoryService);
  private branchSession = inject(BranchSessionService);

  displayedColumns = [
    'date',
    'product',
    'source',
    'target',
    'quantity',
    'user',
    'description'
  ];

  transfers: TransferRecord[] = [];
  filtered: TransferRecord[] = [];

  currentBranch = 0;

  ngOnInit() {
    this.currentBranch = this.branchSession.getBranch();
    this.loadData();
  }

  loadData() {
    this.transferService.getHistory().subscribe(res => {
      this.transfers = res;

      this.filtered = res.filter(t =>
         t.sourceBranchId === this.currentBranch ||
         t.targetBranchId === this.currentBranch
      );
    });
  }
}
