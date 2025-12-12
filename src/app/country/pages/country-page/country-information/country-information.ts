import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [ DecimalPipe ],
  templateUrl: './country-information.html',
})
export class CountryInformationPageComponent {
  country = input.required<Country>();
}
