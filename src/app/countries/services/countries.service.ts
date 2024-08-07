import { CacheStore } from './../interfaces/cache-store.interface';
import { Country } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: "", countries: [] },
    byCountry: { term: "", countries: [] },
    byRegion: { region: "", countries: [] }
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  public getCountriesRequest(url: string) : Observable<Country[] >{
    return this.http.get<Country[]>(url).pipe(
      catchError( () => of([])),
      delay(2000),
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }

  searchCapital(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term: query, countries }),
        tap( () => this.saveToLocalStorage() ),
    );
  }

  searchCountry(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = {term: query, countries}),
        tap( () => this.saveToLocalStorage() ),
      )
  }

  SearchRegion(query: Region):  Observable<Country[]> {
    const url = `${this.apiUrl}/region/${query}`;

    return this.http.get<Country[]>(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region: query, countries}),
        tap( () => this.saveToLocalStorage() ),
      )
  }

}
