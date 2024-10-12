import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl= 'https://sale-nest-api.onrender.com/api/customAI'
  // private apiUrl = 'http://localhost:3000/api/customAI';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Charset': 'UTF-8'
    });
  }

  trainAI(text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/train`, { text }, { headers: this.getHeaders(), responseType: 'text' })
      .pipe(map(response => JSON.parse(response)));
  }

  trainFromFolder(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post(`${this.apiUrl}/train-folder`, formData, { headers: this.getHeaders(), responseType: 'text' })
      .pipe(map(response => JSON.parse(response)));
  }

  trainFromWeb(url: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/train-web`, { url }, { headers: this.getHeaders(), responseType: 'text' })
      .pipe(map(response => JSON.parse(response)));
  }

  queryAI(query: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/query`, { query }, { headers: this.getHeaders(), responseType: 'text' })
      .pipe(map(response => JSON.parse(response)));
  }

  saveModel(filename: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, { filename }, { headers: this.getHeaders(), responseType: 'text' })
      .pipe(map(response => JSON.parse(response)));
  }

  loadModel(filename: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/load`, { filename }, { headers: this.getHeaders(), responseType: 'text' })
      .pipe(map(response => JSON.parse(response)));
  }

  getTrainedModels(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/trained-models`, { headers: this.getHeaders() });
  }
}