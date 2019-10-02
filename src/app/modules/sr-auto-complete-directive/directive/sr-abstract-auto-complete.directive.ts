import {AfterViewInit, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material";
import {NgControl} from "@angular/forms";
import {debounceTime, map, startWith, takeUntil} from "rxjs/operators";
import {Observable} from "rxjs";
import {isNotNullOrUndefined, isNullOrUndefined, isString} from "../../sr-utils/commons/sr-commons.model";
import {ListResource} from "../../sr-http/model/list-resource.model";
import {Subject} from "rxjs/internal/Subject";

export abstract class SrAbstractAutoCompleteDirective<T> implements OnInit, AfterViewInit, OnDestroy {
  protected unsubscribes: Subject<void> = new Subject();

  itemSelected: T;
  abstract matAutoComplete: MatAutocomplete;
  @Input()
  limitRequest: number = 20;
  @Output()
  onItemSelectedEvent: EventEmitter<T> = new EventEmitter<T>();
  @Output()
  onItensFiltered: EventEmitter<Array<T> | ListResource<T>> = new EventEmitter<Array<T> | ListResource<T>>();

  constructor(protected elementRef: ElementRef, protected form: NgControl) {
  }

  ngOnInit(): void {
    this.matAutoComplete.displayWith = this.display;
    //ouvindo evento de seleção
    this.matAutoComplete
      .optionSelected
      .pipe(takeUntil(this.unsubscribes))
      .subscribe((event) => this.onItemSelected(event));
    //escutando evento do form
    this.form.valueChanges
      .pipe(debounceTime(500))
      .pipe(
        startWith<string | T>(""),
        map((state: any) => {
          this.filter(state, this.limitRequest)
            .pipe(takeUntil(this.unsubscribes))
            .subscribe(itensFiltered => {
              this.onItensFiltered.emit(itensFiltered);
            });
        }),
        takeUntil(this.unsubscribes)
      ).subscribe();
  }

  ngAfterViewInit(): void {
    //filtro inicial
    this.filter(null, this.limitRequest).pipe(takeUntil(this.unsubscribes)).subscribe(result => this.onItensFiltered.emit(result));
  }

  @HostListener("document:click", ["$event"])
  onClick($event: any) {
    if (isNullOrUndefined(this.itemSelected)) {
      this.itemSelected = this.form.control.value;
    }
  }

  @HostListener("document:keydown", ["$event"]) onKeydownHandler(event: KeyboardEvent) {
    if (isNullOrUndefined(this.itemSelected)) {
      this.itemSelected = this.form.control.value;
    }
  }

  @HostListener("blur", ["$event"])
  onBlur($event: any) {
    //vamos verificar se o usuário fez alguma modificação no input
    //se a inicial for a mesma, devemos inserir o itemSelected no formControl novamente
    //verificando se o item selecionado é diferente de nulo
    if (isNotNullOrUndefined(this.form.control.value)) {
      //se o value for uma string devemos validar o campo
      if (isString(this.form.control.value)) {
        //se o input tiver com uma string vazia não é necessário fazer nada
        if (this.form.control.value.length > 0) {
          //se o inicio descricao do item for igual ao que esta no input
          const displayItemSelected = this.display(this.itemSelected);
          if (isNotNullOrUndefined(displayItemSelected) && displayItemSelected.startsWith(this.form.control.value)) {
            //setando o item selecionado novamente
            this.onItemSelected(this.itemSelected);
          } else {
            //removendo o item selecionado
            this.onItemSelected(null);
          }
        }
      }
    } else {
      this.onItemSelected(null);
    }
  }

  onItemSelected(event?: MatAutocompleteSelectedEvent | T) {
    if (event instanceof MatAutocompleteSelectedEvent) {
      this.itemSelected = (event as MatAutocompleteSelectedEvent).option.value;
    } else {
      this.itemSelected = (event as T);
    }
    this.onItemSelectedEvent.emit(this.itemSelected);
    this.form.control.setValue(this.itemSelected);
    this.form.control.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.unsubscribes.next();
  }

  abstract filter(term?: string, limitRequest?: number): Observable<Array<T> | ListResource<T>>;

  abstract display(value: T): string;
}
