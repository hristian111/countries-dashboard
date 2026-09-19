import { Component, inject } from '@angular/core';

import { CountriesComponent } from './pages/countries/countries.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [CountriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected readonly themeService = inject(ThemeService);
}
