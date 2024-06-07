import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-contact-page',
  standalone: false,
  template: `
      <p>contact-page works!</p>
      `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ContactPageComponent { }
