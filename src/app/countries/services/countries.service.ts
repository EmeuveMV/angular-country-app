import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1/';
    
    public cacheStore: CacheStore = {
        byCapital:   { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion:    { term: '', countries: [] },
    }



    constructor(private http: HttpClient) {
        // Cualquier cambio que sufra esta clase van a sobrevivir 
        // a lo largo de toda la vida de la aplicacion
        this.loadFromLocalStorage(); 

        
        /* 
        Como esto no es un componente de angular se puede hacer 
        directamente en el constructor por que es lo que se quiere 
        cuando se inicializa el servicio.
        
        */
    }

    private saveToLocalStorage(){
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage(){
        if( !localStorage.getItem('cacheStore') ) return;
    
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }



    private getCountriesRequest(url: string): Observable<Country[]> {

        return this.http.get<Country[]>(url)
            .pipe(
                catchError( () => of([]) ),   
                // delay(2000),
            );

        // Si no hay un subscribe entonces esta peticion solo se define, pero no se ejecuta
        // Hasta que no haya un subscribe este observable no se esta utilizando

        /* 
             Los Observables tienen un metodo llamado pipe, es un metodo en el cual 
             se pueden especificar diferentes operadores de RxJS
        */
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {

        const url = `${this.apiUrl}/alpha/${code}`;

        return this.http.get<Country[]>(url)
            .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(error => {
                    console.log(error);

                    return of(null)
                })
            );
    }


    searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap(countries => this.cacheStore.byCapital = {term, countries}),
                tap(()=> this.saveToLocalStorage())
            );
    }

    searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap(countries => this.cacheStore.byCountries = {term, countries}),
                tap(()=> this.saveToLocalStorage())
            );
    }

    searchRegion(term: Region): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${term}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap(countries => this.cacheStore.byRegion = {term, countries}),
                tap(()=> this.saveToLocalStorage())
            );
    }
}

/* 
Refactorizacion de codigo es algo que tarde o temprano
vamos a tener que hacer, no es mas que hacer que el codigo
funcione exactamente como antes, solo que de una manera mas 
limpia.
*/