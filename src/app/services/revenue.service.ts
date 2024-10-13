import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface Order {
  status: string;
  totalPrice: number;
  createdAt: string;
}
@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  private apiUrl = 'https://sale-nest-api.onrender.com/api/revenues';
  // private apiUrl = 'http://localhost:3000/api/revenues';
  constructor(private http: HttpClient) {}

  getRevenueByPeriod(period: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${period}`);
  }

  addRevenue(): Observable<any> {
    return this.http.get<Order[]>(`http://localhost:3000/api/orders`).pipe(
      map(orders => {
        const completedOrders = orders.filter(order => order.status === 'completed');
        const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        return this.http.post(this.apiUrl, { date, amount: totalRevenue });
      })
    );
  }
}
