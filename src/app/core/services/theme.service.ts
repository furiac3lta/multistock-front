import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);
  private themeSubject = new BehaviorSubject<ThemeMode>(this.loadInitialTheme());
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
  }

  getTheme(): ThemeMode {
    return this.themeSubject.value;
  }

  setTheme(mode: ThemeMode) {
    this.themeSubject.next(mode);
    this.persist(mode);
    this.applyTheme(mode);
  }

  toggleTheme() {
    const next = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  private loadInitialTheme(): ThemeMode {
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return 'dark';
  }

  private persist(mode: ThemeMode) {
    localStorage.setItem('theme', mode);
  }

  private applyTheme(mode: ThemeMode) {
    const body = this.document.body;
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(`theme-${mode}`);

    // Inform the browser for native form controls
    this.document.documentElement.style.colorScheme = mode;
  }
}
