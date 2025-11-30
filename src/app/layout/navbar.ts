import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BranchSwitcher } from '../shared/components/brand-switcher/brand-switcher';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, BranchSwitcher],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {

  @Output() toggleSidebar = new EventEmitter<void>();

  usuario = { nombre: 'Marce Dev' };

  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    window.location.href = '/login';
  }
}
