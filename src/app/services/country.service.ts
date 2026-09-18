import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Country } from '../models/country.model';


const COUNTRIES_URL = 'countries.json';

const FAKE_DELAY_MS = 200;

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(COUNTRIES_URL).pipe(delay(FAKE_DELAY_MS));
  }
}
