import { Injectable,  Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  @Output() change: EventEmitter<string> = new EventEmitter();

  constructor() { }

  sendSku(sku: string){
    this.change.emit(sku);
  }
}
