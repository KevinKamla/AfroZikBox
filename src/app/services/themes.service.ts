import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private isDarkMode = false;
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  setTheme(isDark: boolean) {
    this.isDarkMode = isDark;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  getTheme() {
    return this.isDarkMode;
  }
}
