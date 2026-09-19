import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { catchError, tap } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


const MAX_COUNTRIES = 12;

@Component({
  selector: 'app-countries',
  imports: [CountryCardComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
export class CountriesComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly countryService = inject(CountryService);
  protected fb = inject(FormBuilder);

  protected readonly countries = signal<Country[]>([]);
  protected readonly continents = signal<string[]>([]);

  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);
  
  protected readonly displayedCountries = signal<Country[]>([]);

  protected readonly filterForm = this.fb.nonNullable.group({
      name: [''],
      continent: [''],
      sortBy: ['name'],
  });


  constructor() {
    this.getCountries();

    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.applyFilters();
      });
  }

  private getCountries(): void {
    this.countryService
      .getCountries()
      .pipe(
        tap((countries) => {
          this.countries.set(countries);
          this.applyFilters();
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

  private applyFilters(): void {
    const { name, continent } = this.filterForm.getRawValue();

    const filtered = this.countries().filter((country) => 
      country.name.toLowerCase().includes(name.toLowerCase()) && 
      (continent === '' || country.continent === continent),
    );
   
    const sorted = this.sortCountries(filtered);
    this.displayedCountries.set(sorted.slice(0, MAX_COUNTRIES));

  }

 
  private sortCountries(countries: Country[]): Country[] {
    
    const sorted = [...countries];
    const sortBy = this.filterForm.get('sortBy')?.value;
    
    if (sortBy === 'population') {
      return sorted.sort((a, b) => b.population - a.population);
    } else if (sortBy === 'totalArea') {
      return sorted.sort((a, b) => b.totalArea - a.totalArea);
    }

    return sorted
  }

}
