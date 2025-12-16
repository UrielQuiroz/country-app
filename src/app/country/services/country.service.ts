import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log('Obteniendo del servidor...')
    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
          return throwError(
            () => new Error(`No se pudo obtener paises con ese query ${ query }`)
          )
        })
      )
  }

    searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
        delay(2000),
        catchError((error) => {
          return throwError(
            () => new Error(`No se pudo obtener paises con esta búsqueda ${ query }`)
          )
        })
      )
  }

  searchCountryByAlphaCode(code: string) {

    return this.http.get<RESTCountry[]>(`${ API_URL }/alpha/${ code }`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
        map( countries => countries.at(0) ),
        catchError((error) => {
          return throwError(
            () => new Error(`No se pudo obtener paises con ese código ${ code }`)
          )
        })
      )
  }
}
