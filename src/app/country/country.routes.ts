import { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page';

export const countryroutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  },
];

export default countryroutes;
