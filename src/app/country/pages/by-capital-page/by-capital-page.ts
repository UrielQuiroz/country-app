import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list";
import { SearchInputComponent } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    if( this.isLoading() ) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query)
    .subscribe(countries => {
      this.isLoading.set(false);
      this.countries.set(countries);
    })
  }
}
