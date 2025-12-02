import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { Navbar } from './navbar';
import { Footer } from './footer';
import { GlobalLoaderComponent } from '../components/global-loader/global-loader';
import { AppTabs } from './nav-tabs';
import { ThemeService, ThemeMode } from '../core/services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    Footer,
    GlobalLoaderComponent,
    AppTabs,
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout implements OnInit, OnDestroy {
  theme: ThemeMode = 'dark';
  private subscription?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.theme = this.themeService.getTheme();
    this.subscription = this.themeService.theme$.subscribe(mode => {
      this.theme = mode;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
