import { Country } from '../../interfaces/country.interface';
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {


  constructor(private countriesService: CountriesService){}


  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = "";

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries
    this.initialValue = this.countriesService.cacheStore.byCountry.term

  }

  searchByCountry(name: string){
    this.isLoading = true;
    this.countriesService.searchCountry(name)
      .subscribe(country => {
        this.countries = country
        this.isLoading = false;
      })
  }
}
