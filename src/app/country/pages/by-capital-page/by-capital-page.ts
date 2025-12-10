import { Component, inject } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list";
import { SearchInputComponent } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  onSearch(query: string) {
    console.log({ query })

    this.countryService.searchByCapital(query).
      subscribe(res => console.log(res))
  }
}
