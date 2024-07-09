import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounce, debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit,  OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = "";

  @Input()
  public searchValue:string = "";

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(value: string){
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next( searchTerm );
  }

}
