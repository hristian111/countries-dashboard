import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-card',
  imports: [DecimalPipe],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.css',
})
export class CountryCardComponent {
  readonly country = input.required<Country>();
}
