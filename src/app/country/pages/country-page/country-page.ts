import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found';
import { CountryInformationPageComponent } from './country-information/country-information';

@Component({
  selector: 'app-country-page',
  imports: [ NotFoundComponent, CountryInformationPageComponent ],
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
