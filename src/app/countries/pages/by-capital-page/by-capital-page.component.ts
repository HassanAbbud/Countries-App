import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{

  constructor(private countriesService: CountriesService){}


  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = "";

  ngOnInit(): void {
    // Keep cache of searched terms
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string){
    this.isLoading = true;

    this.countriesService.searchCapital(term)
      .subscribe(countries => {
      this.countries = countries
      this.isLoading = false;
    });

  }
}
