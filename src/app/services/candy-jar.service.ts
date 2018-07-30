import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { SkuHistoryEntry } from '../models/skuHistoryEntry.model';
import { SkuAvailableEntry } from '../models/skuAvailableEntry.model'; 
import { productInfoEntry } from '../models/productInfoEntry.model';
import { EsbLiveCountEntry } from '../models/EsbLiveCountEntry.model';
import { SkuBopisHistoryEntry } from '../models/skuBopisHistoryEntry.model';

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
    const url = `${this.serviceUrl}SkuHistory?sku=${sku}`
    return this.http.get<SkuHistoryEntry []>(url).pipe(
      catchError(() => of([])));
  }

  getSkuAvailableQuantity(sku: string): Observable<SkuAvailableEntry []>{
    if(sku.length > 8){
      sku = sku.replace("0", "");
    }
    const url = `${this.serviceUrl}SkuAvailableQuantity?sku=${sku}`
    return this.http.get<SkuAvailableEntry []>(url).pipe(
      catchError(() => of([])));
  }

  getProductInfoEntry(code: string, type: string): Observable<productInfoEntry []>{
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

  getESBInventory(location: string, sku: string): Observable<EsbLiveCountEntry []> {
    if(sku.length > 8){
      sku = sku.replace("0", "");
    }
    const url = `${this.serviceUrl}EsbLiveCount?location=${location}&sku=${sku}`;
    return this.http.get<EsbLiveCountEntry []>(url).pipe(
      catchError(() => of([])));
  }
  getSkuBopisHistory(location: string, sku: string): Observable<SkuBopisHistoryEntry []> {
    if(sku.length > 8){
      sku = sku.replace("0", "");
    }
    const url = `${this.serviceUrl}SkuBopisHistory?sku=${sku}&location=${location}`;
    return this.http.get<SkuBopisHistoryEntry []>(url).pipe(
      catchError(() => of([])));
  }

  getSkuByUpc(upc: string): Observable<string []>{
    if(upc.length < 12){
      upc = upc.padStart(12,"0");
    }
    const url = `${this.serviceUrl}skuByUpc?upc=${upc}`;
    return this.http.get<string []>(url).pipe(
      catchError(() => of([])));
  }
}