import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  addRevenue(date: string, amount: number): Observable<any> {
    return this.http.post(this.apiUrl, { date, amount });
  }
}
