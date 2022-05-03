import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../model/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  url: string='http://localhost:8080/api/checkout/purchase';
  constructor(private httpClient : HttpClient) { }


  placeAnOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.url,purchase);
  }
}
