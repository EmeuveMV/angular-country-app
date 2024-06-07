import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})

// Para cargar algo del servicio usualmente no se hace en el constructor
// Se implemente en un ngOnInit
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  
  
  constructor( private countriesService: CountriesService ) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital( term: string):void{
    this.isLoading = true;
    this.countriesService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
