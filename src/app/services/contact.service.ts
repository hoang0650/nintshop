import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://sale-nest-api.onrender.com/api/contacts';

  constructor(private http: HttpClient) {}

  sendContactForm(contactData: any): Observable<any> {
    return this.http.post(this.apiUrl, contactData);
  }

  getContactForm(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
