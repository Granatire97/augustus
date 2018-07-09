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

  private serviceUrl = 'http://localhost:8080/';
  //'http://localhost:8080/SkuHistory?sku=90496373';

  constructor(private http: HttpClient) { }

  getSkuHistory(sku: string): Observable<SkuHistoryEntry []> {
    const url = `${this.serviceUrl}SkuHistory?sku=${sku}`
    return this.http.get<SkuHistoryEntry []>(url).pipe(
      catchError(() => of([])));
  }

  getSkuAvailableQuantity(sku: string): Observable<SkuAvailableEntry []>{
    const url = `${this.serviceUrl}SkuAvailableQuantity?sku=${sku}`
    return this.http.get<SkuAvailableEntry []>(url).pipe(
      catchError(() => of([])));
  }

  getProductInfoEntry(sku: string): Observable<productInfoEntry []>{
    const url = `${this.serviceUrl}sku?sku=${sku}`
    return this.http.get<productInfoEntry []>(url).pipe(
      catchError(() => of([])));
  }


}
