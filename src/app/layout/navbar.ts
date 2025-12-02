import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { BranchSwitcher } from '../shared/components/brand-switcher/brand-switcher';
import { ThemeService } from '../core/services/theme.service';

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
  theme: 'light' | 'dark' = 'dark';

  private themeService = inject(ThemeService);
  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.themeService.currentTheme$.subscribe((mode) => this.theme = mode);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleTheme() {
    this.themeService.toggle();
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    window.location.href = '/login';
  }
}
