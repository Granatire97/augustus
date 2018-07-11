import { Injectable,  Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  //@Output() change: EventEmitter<{}> = new EventEmitter();
  
  private code = new BehaviorSubject<any>({productCode: "null", productType: "null"});
  private found = new BehaviorSubject(false);
  currentCode = this.code.asObservable();
  currentFound = this.found.asObservable();

  updateCode(code: string, type: string){
    this.code.next({productCode: code, productType: type})
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