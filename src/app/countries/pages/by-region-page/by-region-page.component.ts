import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type'
import { cacheStore } from '../../interfaces/cache-store.interface';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  constructor(private countriesService: CountriesService){}

  public countries: Country[] = [];

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region
  }

  searchByRegion(region: Region){

    this.selectedRegion = region;

    this.countriesService.SearchRegion(region)
      .subscribe(country => {
        this.countries = country
      })
  }
}
