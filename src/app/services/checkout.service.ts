import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'https://sale-nest-api.onrender.com/api/orders';
  // private apiUrl = 'http://localhost:3000/api/orders'

  constructor(private http: HttpClient) {}

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }

  getOrder(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?search=${query}`);
  }

  // Order operations
  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  updateOrderStatus(id: string, status: any['status']): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/orders/${id}`, { status });
  }
}
