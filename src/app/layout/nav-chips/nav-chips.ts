import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-chips',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './nav-chips.html',
  styleUrls: ['./nav-chips.scss'],
})
export class NavChips {

  constructor(private router: Router) {}

  items = [
    { label: 'Dashboard', path: '/' },
    { label: 'Productos', path: '/products' },
    { label: 'Categorías', path: '/categories' },
    { label: 'Movimientos', path: '/movements/history' }
  ];

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
