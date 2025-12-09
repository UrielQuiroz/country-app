import { Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.html',
})
export class ByRegionPageComponent { }
