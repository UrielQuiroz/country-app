import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list";
import { SearchInputComponent } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParams);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ({ params  }) => {
      console.log({query: params.query})
      if(!params.query) return of([]);

      return this.countryService.searchByCapital(params.query)
    },
  })

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),

  //   loader: async ({ params }) => {
  //     if(!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(params.query)
  //     )
  //   }
  // })

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if( this.isLoading() ) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   .subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },

  //     error: ( err ) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     }
  //   })
  // }
}
