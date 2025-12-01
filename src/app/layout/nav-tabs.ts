import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-tabs.html',
  styleUrls: ['./nav-tabs.scss']
})
export class AppTabs {

  items = [
    { label: 'Dashboard', path: '/' },
    { label: 'Productos', path: '/products' },
    { label: 'Categorías', path: '/categories' },
    { label: 'Movimientos', path: '/movements/history' },
    { label: 'Historial', path: '/logs' }

  ];
}
