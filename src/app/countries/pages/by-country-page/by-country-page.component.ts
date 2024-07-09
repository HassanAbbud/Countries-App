import { Country } from '../../interfaces/country';
import { CountriesService } from './../../services/countries.service';
import { Component } from '@angular/core';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  constructor(private countriesService: CountriesService){}

  public countries: Country[] = [];
  public isLoading: boolean = false;

  searchByCountry(name: string){
    this.isLoading = true;
    this.countriesService.searchCountry(name)
      .subscribe(country => {
        this.countries = country
        this.isLoading = false;
      })
  }
}
