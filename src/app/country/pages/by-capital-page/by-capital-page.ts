import { Component } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input";
import { CountryListComponent } from "../../components/country-list/country-list";

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPageComponent {
  onSearch(value: string) {
    console.log({ value })
  }
}
