import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { tap } from 'rxjs';

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

  constructor() {
    this.getCountries();
  }

  private getCountries(): void {
    this.countryService
      .getCountries()
      .pipe(
        tap((data) => {
          console.log(data);
          this.countries.set(data);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
