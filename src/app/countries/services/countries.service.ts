import { Country } from './../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

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

    return this.getCountriesRequest(url);
  }

  searchCountry(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;

    return this.getCountriesRequest(url);
  }

  SearchRegion(query: string):  Observable<Country[]> {
    const url = `${this.apiUrl}/region/${query}`;

    return this.http.get<Country[]>(url)
  }

}
