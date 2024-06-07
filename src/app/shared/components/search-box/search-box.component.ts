import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  template: `
  <!-- (keyup.enter)="emitValue( txtSearchInput.value )" -->
    <input 
    type="text"
    [placeholder]="placeholder"
    [value]="initialValue" 
    class="form-control"
    (keyup)="onKeyPress(txtSearchInput.value)"
    #txtSearchInput
    >
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubs?: Subscription;
  
  @Input()
  placeholder: string = "";
  @Input()
  public initialValue: string = '';
  
  @Output()
  public onValue = new EventEmitter();
  @Output()
  public onDebounce = new EventEmitter();

  
  ngOnInit(): void {
    this.debouncerSubs = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
    }
    
    ngOnDestroy(): void {
      this.debouncerSubs?.unsubscribe();
    }

    emitValue(value: string): void {
      this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}


/* 
Debounce, no es mas que forma de esperar a que 
el usuario deje de escribir para lanzar la peticion
*/

/* 
Siempre que se haga un subscribe 
que no sea (http, get, post, etc), 
entonces hay que limpiar esa subscripcion o
destruirla onDestroy.
*/