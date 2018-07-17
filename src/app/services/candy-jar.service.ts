import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { SkuHistoryEntry } from '../models/skuHistoryEntry.model';
import { SkuAvailableEntry } from '../models/skuAvailableEntry.model'; 
import { productInfoEntry } from '../models/productInfoEntry.model';

@Injectable({
  providedIn: 'root'
})
export class CandyJarService {

  private serviceUrl = window.location.protocol + '//' + window.location.hostname + ':8012/';
  //'http://localhost:8080/SkuHistory?sku=90496373';

  constructor(private http: HttpClient) { }

  getSkuHistory(sku: string): Observable<SkuHistoryEntry []> {
    if(sku.length > 8){
      sku = sku.replace("0", "");
    }
    if(sku.length < 8){
      sku = "999999999999";
    }
    const url = `${this.serviceUrl}SkuHistory?sku=${sku}`
    return this.http.get<SkuHistoryEntry []>(url).pipe(
      catchError(() => of([])));
  }

  getSkuAvailableQuantity(sku: string): Observable<SkuAvailableEntry []>{
    if(sku.length > 8){
      sku = sku.replace("0", "");
    }
    if(sku.length < 8){
      sku = "999999999999";
    }
    const url = `${this.serviceUrl}SkuAvailableQuantity?sku=${sku}`
    return this.http.get<SkuAvailableEntry []>(url).pipe(
      catchError(() => of([])));
  }

  getProductInfoEntry(code: string, type: string): Observable<productInfoEntry []>{
    console.log(this.serviceUrl);
    switch(type){
      case "eCode": 
        var url = `${this.serviceUrl}eCode?eCode=${code}`
        return this.http.get<productInfoEntry []>(url).pipe(
          catchError(() => of([])));
      case "Style":
        var url = `${this.serviceUrl}style?style=${code}`
        return this.http.get<productInfoEntry []>(url).pipe(
          catchError(() => of([])));
      case "SKU":
        if(code.length < 9){
          code = "0" + code;
        }
        var url = `${this.serviceUrl}sku?sku=${code}`
        return this.http.get<productInfoEntry []>(url).pipe(
        catchError(() => of([])));
      case "UPC":
        if(code.length < 12){
          code = code.padStart(12,"0");
        }
        var url = `${this.serviceUrl}upc?upc=${code}`
        return this.http.get<productInfoEntry []>(url).pipe(
          catchError(() => of([])));
    }
  }
}