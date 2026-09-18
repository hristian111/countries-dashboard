import { Component } from '@angular/core';

import { CountriesComponent } from './pages/countries/countries.component';

@Component({
  selector: 'app-root',
  imports: [CountriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
