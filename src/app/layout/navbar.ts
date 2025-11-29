import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchSessionService } from '../core/services/branch-session.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements OnInit {
  
  @Output() toggleSidebar = new EventEmitter<void>();

  usuario = { nombre: 'Marce Dev' };

  branches = [
    { id: 1, name: 'Sucursal Centro' },
    { id: 2, name: 'Sucursal Norte' },
    { id: 3, name: 'Sucursal Sur' }
  ];

  currentBranch = 1;

  constructor(private branchSession: BranchSessionService) {}

  ngOnInit() {
    this.currentBranch = this.branchSession.getBranch();
  }

  changeBranch() {
    this.branchSession.setBranch(this.currentBranch);
    // 🔥 Notificamos a toda la app, sin reload
    this.branchSession.branchId$.subscribe();
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    window.location.href = '/login';
  }
}
