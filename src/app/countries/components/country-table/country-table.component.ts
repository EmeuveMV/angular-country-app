import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  standalone: false,
  template: `
  
    <div *ngIf="countries.length === 0; else table" class="alert alert-warning text-center">
      There're not countries to show.
    </div>

    <ng-template #table>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Icon</th>
          <th>Flag</th>
          <th>Name</th>
          <th>Capital</th>
          <th>Population</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let country of countries; let i = index">
          <td>{{ i + 1}}</td>
          <td>
            {{ country.flag }}
          </td>
          <td> 
            <img [src]="country.flags.svg" [alt]="country.name.common" />
          </td>
          <td>
            {{ country.name.common }}
          </td>
          <td>
            {{ country.capital }}
          </td>
          <td>
            {{ country.population | number}}
          </td>
          <td>
            <a [routerLink]="['/countries/by/', country.cca3]">Info</a>
          </td>
        </tr>
      </tbody>
    </table>

    </ng-template>

  `,
  styles: [`
   img{
    width: 50px;
   }
  `],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CountryTableComponent { 

  @Input()
  public countries: Country[] = [];


}