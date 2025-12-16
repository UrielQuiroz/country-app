import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input";
import { CountryListComponent } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.html',
})
export class ByCountryPageComponent {

    countryService = inject(CountryService);

    activatedRoute = inject(ActivatedRoute);
    route = inject(Router);

    queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

    query = linkedSignal(() => this.queryParams);

    countryResource = rxResource({
      params: () => ({ query: this.query() }),

      stream: ({ params  }) => {
        if(!params.query) return of([]);

      this.route.navigate(['/country/by-country/'], {
        queryParams: {
          query: params.query
        }
      })

        return this.countryService.searchByCountry(params.query)
      },
    })

    // countryResource = resource({
    //   params: () => ({ query: this.query() }),

    //   loader: async ({ params }) => {
    //     if(!params.query) return [];

    //     return await firstValueFrom(
    //       this.countryService.searchByCountry(params.query)
    //     )
    //   }
    // })

}
