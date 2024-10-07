import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = 'https://sale-nest-api.onrender.com/wallet'; // Đường dẫn đến API Node.js

  constructor(private http: HttpClient) {}

  // Nạp tiền vào ví
  deposit(userId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deposit`, { userId, amount });
  }

  // Chuyển tiền
  transfer(senderId: string, recipientEmail: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer`, { senderId, recipientEmail, amount });
  }

  // Quy đổi tiền sang coin
  convertToCoin(userId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/convert`, { userId, amount });
  }

  // Tặng quà
  gift(userId: string, recipientEmail: string, coinAmount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/gift`, { userId, recipientEmail, coinAmount });
  }

  // Rút tiền
  withdraw(userId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/withdraw`, { userId, amount });
  }

  // Quy đổi coin sang USD và trừ 1% phí
  convertCoinToMoney(userId: string, coinAmount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/convertCoinToMoney`, { userId, coinAmount });
  }
}
