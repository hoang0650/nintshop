import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // private apiUrl = 'http://localhost:3000/api/blogs';
  private apiUrl = 'https://sale-nest-api.onrender.com/api/blogs';
  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  // Gọi API lấy các sản phẩm liên quan
  getRelatedProducts(postId: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/related-posts/${postId}`);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }

  updateBlog(id: string, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
