import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from './log.service';
import { LogMovement } from './log.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './log-list.html',
  styleUrls: ['./log-list.scss']
})
export class LogList {

  private logService = inject(LogService);

  logs: LogMovement[] = [];
  filtered: LogMovement[] = [];

  displayedColumns = [
    'createdAt',
    'username',
    'productName',
    'movementType',
    'quantity',
    'description',
    'originBranchName',
    'branchName',
    'beforeStock',
    'afterStock',
    'ip'
  ];

  search = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.logService.findAll().subscribe({
      next: resp => {
        console.log('LOGS => ', resp);
        this.logs = resp;
        this.filtered = resp;
      },
      error: err => console.error(err)
    });
  }

  filter() {
    const s = this.search.toLowerCase().trim();

    this.filtered = this.logs.filter(l =>
      (l.username || '').toLowerCase().includes(s) ||
      (l.productName || '').toLowerCase().includes(s) ||
      (l.branchName || '').toLowerCase().includes(s) ||
      (l.originBranchName || '').toLowerCase().includes(s) ||
      (l.movementType || '').toLowerCase().includes(s) ||
      (l.description || '').toLowerCase().includes(s)
    );
  }
}
