import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParams(queryParams: string): Region {
  queryParams = queryParams.toLowerCase();

  const validateRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  }

  return validateRegions[queryParams] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.html',
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);

    public regions: Region[] = [
      'Africa',
      'Americas',
      'Asia',
      'Europe',
      'Oceania',
      'Antarctic',
    ];

    activatedRoute = inject(ActivatedRoute);
    route = inject(Router);

    queryParams = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

    selectedRegion = linkedSignal<Region>(() => validateQueryParams(this.queryParams));

    countryResource = rxResource({
      params: () => ({ region: this.selectedRegion() }),

      stream: ({ params  }) => {
        if(!params.region) return of([]);

        this.route.navigate(['/country/by-region/'], {
          queryParams: {
            region: params.region
          }
        })

        return this.countryService.searchByRegion(params.region)
      },
    })
}
