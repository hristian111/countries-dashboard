import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-countries',
  imports: [CountryCardComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
export class CountriesComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly countryService = inject(CountryService);

  protected readonly countries = signal<Country[]>([]);
  protected readonly continents = signal<string[]>([]);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.getCountries();
  }

  private getCountries(): void {
    this.countryService
      .getCountries()
      .pipe(
        tap((countries) => {
          this.countries.set(countries);
          this.continents.set(this.getContinents(countries));
          this.loading.set(false);
        }),
        catchError(() => {
          this.error.set('An error occurred while fetching data.');
          this.loading.set(false);
          return [];
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private getContinents(countries: Country[]): string[] {
    const continents = new Set(countries.map((country) => country.continent));
    return Array.from(continents).sort();
  }
}
