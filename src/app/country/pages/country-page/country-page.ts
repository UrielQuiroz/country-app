import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.html',
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryService = inject(CountryService);

  countryResourse = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      console.log(params)
      return this.countryService.searchCountryByAlphaCode(params.code);
    }
  })
}
