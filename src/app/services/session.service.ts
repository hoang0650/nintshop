import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl = 'https://sale-nest-api.onrender.com/api/sessions';
  // private apiUrl = 'http://localhost:3000/api/sessions'; 
  constructor(private http: HttpClient) { }
  getActiveSessions() {
    return this.http.get(`${this.apiUrl}/active`);
  }

  sendMessage(sessionId: string, message: { sender: string, text: string }) {
    return this.http.post(`${this.apiUrl}/${sessionId}/messages`, message);
  }

  closeSession(sessionId: string) {
    return this.http.put(`${this.apiUrl}/${sessionId}/close`, {});
  }
}
