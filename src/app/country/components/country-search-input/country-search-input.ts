import { Component } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.html',
})
export class CountrySearchInputComponent {
  onSearch(value: string) {
    console.log({ value })
  }
}
