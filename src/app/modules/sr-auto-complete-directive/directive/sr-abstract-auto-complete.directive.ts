import {AfterViewInit, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from "@angular/core";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material";
import {NgControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import "rxjs/add/operator/debounceTime";
import {Observable} from "rxjs/Observable";
import {isNotNullOrUndefined, isString} from "../../sr-utils";

export abstract class SrAbstractAutoCompleteDirective<T, A> implements OnInit, AfterViewInit {
  itemSelected: T;
  @Input("srAutoComplete")
  matAutoComplete: MatAutocomplete;
  @Output()
  onItemSelectedEvent: EventEmitter<T> = new EventEmitter<T>();
  @Output()
  onItensFiltered: EventEmitter<A> = new EventEmitter<A>();

  constructor(private elementRef: ElementRef, private form: NgControl) {
  }

  ngOnInit(): void {
    this.matAutoComplete.displayWith = this.display;
    //ouvindo evento de seleção
    this.matAutoComplete
      .optionSelected
      .subscribe((event) => this.onItemSelected(event));
    //escutando evento do form
    this.form.valueChanges
      .debounceTime(500)
      .pipe(
        startWith<string | T>(""),
        map((state: any) => {
          this.filter(state)
            .subscribe(itensFiltered => {
              this.onItensFiltered.emit(itensFiltered);
            });
        })
      ).subscribe();
  }

  ngAfterViewInit(): void {
    //filtro inicial
    this.filter().subscribe(result => this.onItensFiltered.emit(result));
  }

  @HostListener("blur", ["$event"])
  onBlur($event: any) {
    //vamos verificar se o usuário fez alguma modificação no input
    //se a inicial for a mesma, devemos inserir o itemSelected no formControl novamente
    //verificando se o item selecionado é diferente de nulo
    if (isNotNullOrUndefined(this.itemSelected)) {
      //se o value for uma string devemos validar o campo
      if (isString(this.form.control.value)) {
        //se o input tiver com uma string vazia não é necessário fazer nada
        if (this.form.control.value.length > 0) {
          //se o inicio descricao do item for igual ao que esta no input
          if (this.display(this.itemSelected).startsWith(this.form.control.value)) {
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

  abstract filter(term?: string): Observable<A>;

  abstract display(value: T): string;
}
