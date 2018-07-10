import { Injectable,  Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  @Output() change: EventEmitter<{}> = new EventEmitter();

  constructor() { }

  sendCode(code: string, type: string){
    var result = {};
    result = {
      productCode: code,
      productType: type
    }
    this.change.emit(result);
  }
}
