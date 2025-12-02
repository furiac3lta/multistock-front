import { DOCUMENT } from '@angular/common';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  private document = inject(DOCUMENT);
  private themeSubject = new BehaviorSubject<ThemeMode>(this.getStoredTheme());
  private sub: Subscription;

  currentTheme$ = this.themeSubject.asObservable();

  constructor() {
    this.sub = this.currentTheme$.subscribe((theme) => this.applyTheme(theme));
  }

  toggle() {
    const nextTheme: ThemeMode = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.themeSubject.next(nextTheme);
    localStorage.setItem('theme', nextTheme);
  }

  private applyTheme(theme: ThemeMode) {
    const body = this.document.body;
    body.setAttribute('data-theme', theme);
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(`theme-${theme}`);
    body.style.colorScheme = theme;
  }

  private getStoredTheme(): ThemeMode {
    const stored = localStorage.getItem('theme');
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
