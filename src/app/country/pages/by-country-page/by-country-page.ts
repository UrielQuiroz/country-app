import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input";
import { CountryListComponent } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.html',
})
export class ByCountryPageComponent {

    countryService = inject(CountryService);

    query = signal('');

    countryResource = resource({
      params: () => ({ query: this.query() }),

      loader: async ({ params }) => {
        if(!params.query) return [];

        return await firstValueFrom(
          this.countryService.searchByCountry(params.query)
        )
      }
    })

}
