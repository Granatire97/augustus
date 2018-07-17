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


  constructor(private http: HttpClient) { }
  
  getESBInventory(location: string, sku: string): Observable<EsbLiveCountEntry []> {
    const serviceUrl = this.getUrl();
    console.log(serviceUrl);
    if(sku.length > 8){
      sku = sku.replace("0", "");
    }
    if(sku.length < 8){
      sku = "999999999999";
    }
    const url = `${serviceUrl}`;
    const params = `[{"location": "0", "sku": "${sku}"}]`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };  
    return this.http.post<EsbLiveCountEntry[]>(url,params, httpOptions).pipe(
      catchError(() => of([])));
  }

  getUrl(){
    switch(window.location.hostname){
      case 'eomint.dcsg.com':
      case 'dkha0326.dcsg.com':
      case 'candyjar.dcsg.com':
        return 'http://is-prod1.dcsg.com/rest/v1/inventory';
      case 'eomdevint.dcsg.com':
      case 'dkda3326.dcsg.com':
      case 'candyjardev.dcsg.com':
      case 'eomdevqa.dcsg.com':
      case 'dkda2331.dcsg.com':
      case 'candyjarqa.dcsg.com':
      case 'localhost':
        return 'http://esbqa.dcsg.com/rest/v1/inventory';
    }
  }
}

