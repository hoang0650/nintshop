import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'https://sale-nest-api.onrender.com/api/orders'; // Thay bằng URL thực tế của bạn

  constructor(private http: HttpClient) {}

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }
}
