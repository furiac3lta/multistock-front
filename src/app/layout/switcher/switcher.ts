import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BranchSessionService } from '../../core/services/branch-session.service';
import { BranchService, Branch } from '../../core/services/branch.service';

@Component({
  selector: 'app-layout-switcher',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './switcher.html',
  styleUrls: ['./switcher.scss']
})
export class LayoutSwitcher implements OnInit {

  private branchSession = inject(BranchSessionService);
  private branchService = inject(BranchService);

  branches: Branch[] = [];
  currentBranch = 1;

  navItems = [
    { label: 'Dashboard', route: '/' },
    { label: 'Productos', route: '/products' },
    { label: 'Categorías', route: '/categories' },
    { label: 'Movimientos', route: '/movements/history' }
  ];

  ngOnInit() {
    this.currentBranch = this.branchSession.getBranch();

    // cargar sucursales reales
    this.branchService.getAll().subscribe(b => this.branches = b);
  }

  changeBranch(id: number) {
    this.currentBranch = id;
    this.branchSession.setBranch(id);
  }
}
