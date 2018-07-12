import { Injectable,  Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  //@Output() change: EventEmitter<{}> = new EventEmitter();
  
  private code = new BehaviorSubject<any>({productCode: "null", productType: "null"});
  private filters = new BehaviorSubject<any>({presale: "", hotmarket: "", specialOrder: "", vdceligible: ""});
  private found = new BehaviorSubject(false);
  currentCode = this.code.asObservable();
  currentFilters = this.filters.asObservable();
  currentFound = this.found.asObservable();

  updateCode(code: string, type: string){
    this.code.next({productCode: code, productType: type})
  }

  updateFilters(presale: string, hotmarket: string, specialOrder: string, vdceligible: string){
    this.filters.next({
      'presale': presale, 
      'hotMarket': hotmarket, 
      'specialOrder': specialOrder, 
      'vdceligible': vdceligible
    });
    console.log(this.filters);
  }

  infoFound(found: boolean){
    this.found.next(found);
  }

  constructor() { }
/*
  sendCode(code: string, type: string){
    var result = {};
    result = {
      productCode: code,
      productType: type
    }
    this.change.emit(result);
  }

  infoFound(found: boolean){
    this.change.emit(found);
  }
  */
}
