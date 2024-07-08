import { Country } from './../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1"

  constructor(private http: HttpClient) { }

  searchCapital(query: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${query}`)

  }
}
