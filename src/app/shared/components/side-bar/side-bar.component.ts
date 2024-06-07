import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-side-bar',
  standalone: false,
  template: `
      
      <h2>Countries</h2>
      <hr>

      <ul class="list-group">
        <!-- <li 
          routerLink="home" 
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }" 
          class="list-group-item">
          Home Page
        </li> -->
        <!-- [routerLinkActiveOptions]="{ exact: true }"
              Esto lo que dice es que solo se activa si esta
              exactamente como esta definida la ruta  
        -->
        <!-- <li 
          routerLink="about" 
          routerLinkActive="active"
          class="list-group-item">
          About Page
        </li>
        <li 
          routerLink="contact" 
          routerLinkActive="active"
          class="list-group-item">
          Contact Page
        </li> -->
        <li 
          routerLink="countries/by-capital" 
          routerLinkActive="active"
          class="list-group-item">
          By Capital
        </li>
        <li 
          routerLink="countries/by-country" 
          routerLinkActive="active"
          class="list-group-item">
          By Country
        </li>
        <li 
          routerLink="countries/by-region" 
          routerLinkActive="active"
          class="list-group-item">
          By Region
        </li>
      </ul>
      
      `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent { }
