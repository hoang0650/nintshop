import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/blogs';
  // private apiUrl = 'https://sale-nest-api.onrender.com/api/blogs';
  constructor(private http: HttpClient) { }

  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBlog(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBlog(blogData: any): Observable<any> {
    return this.http.post(this.apiUrl, blogData);
  }

  updateBlog(id: string, blogData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, blogData);
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
