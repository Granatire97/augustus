import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { SkuHistoryEntry } from '../models/skuHistoryEntry.model';
import { HttpHeaders } from '@angular/common/http';
import { EsbLiveCountEntry } from '../models/EsbLiveCountEntry.model';
@Injectable({
  providedIn: 'root'
})
export class EsbInventoryService {

  private serviceUrl = 'http://esbqa.dcsg.com/rest/v1/inventory';

  constructor(private http: HttpClient) { }

  getESBInventory(location: string, sku: string): Observable<EsbLiveCountEntry []> {
    if(sku.length > 8){
      sku = sku.replace("0", "");
    }
    if(sku.length < 8){
      sku = "999999999999";
    }
    const url = `${this.serviceUrl}`;
    const params = `[{"location": "0", "sku": "${sku}"}]`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };  
    return this.http.post<EsbLiveCountEntry[]>(url,params, httpOptions).pipe(
      catchError(() => of([])));
  }

}

