import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

    public country?: Country;

    constructor ( 
      private activaredRoute: ActivatedRoute, 
      private router: Router,
      private countriesService: CountriesService,
    ) {}
  
    ngOnInit(): void {
      this.activaredRoute.params
          .pipe(
            switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode(id)),

            /* 
              El objetivo del switchMap es regresar un nuevo observable
            */
          )
          .subscribe( country  => {
              // console.log({params: id});
              if (!country) return this.router.navigateByUrl('by-capital');
              return this.country = country;
            });
    }
}
// programación reactiva