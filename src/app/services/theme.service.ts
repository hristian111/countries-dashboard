import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<'light' | 'dark'>(this.getTheme());

  constructor() {
    document.documentElement.setAttribute('data-theme', this.theme());
  }

  toggleTheme(): void {
    const newTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  getTheme(): 'light' | 'dark' {
    const theme = localStorage.getItem('theme');
    return theme === 'dark' ? 'dark' : 'light';
  }
}
