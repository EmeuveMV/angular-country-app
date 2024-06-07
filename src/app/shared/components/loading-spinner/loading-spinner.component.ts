import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-loading-spinner',
  standalone: false,
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoadingSpinnerComponent { }
