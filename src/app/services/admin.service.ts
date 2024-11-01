import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/services'; // Adjust this to your API URL

  constructor(private http: HttpClient) { }
  registerStore(storeData: any): Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(`${this.apiUrl}/stores`, storeData, { headers });
  }

  registerBlogger(bloggerData: any): Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(`${this.apiUrl}/bloggers`, bloggerData,{ headers });
  }

  createProject(projectData: any): Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(`${this.apiUrl}/projects`, projectData,{ headers });
  }

  submitComplaint(complaintData: any): Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(`${this.apiUrl}/complaints`, complaintData,{ headers });
  }

  getAllStore() : Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${this.apiUrl}/stores`,{ headers });
  }

  getAllBloggers(): Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${this.apiUrl}/bloggers`,{ headers });
  }

  getStoreTransactions(storeId: string): Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${this.apiUrl}/stores/${storeId}/transactions`,{ headers });
  }

  getBloggerTransactions(bloggerId: string): Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${this.apiUrl}/bloggers/${bloggerId}/transactions`,{ headers });
  }

  getAllTransactions(): Observable<any> {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${this.apiUrl}/transactions`,{ headers });
  }
}
