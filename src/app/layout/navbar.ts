import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { BranchSwitcher } from '../shared/components/brand-switcher/brand-switcher';
import { ThemeMode, ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, BranchSwitcher],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements OnInit, OnDestroy {

  @Output() toggleSidebar = new EventEmitter<void>();

  usuario = { nombre: 'Marce Dev' };
  theme: ThemeMode = 'dark';
  private subscription?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
    this.subscription = this.themeService.theme$.subscribe(mode => this.theme = mode);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    window.location.href = '/login';
  }
}
