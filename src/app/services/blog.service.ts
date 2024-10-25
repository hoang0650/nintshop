import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { Comment, Reply } from '../interfaces/comment';
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

  // Phương thức lấy blog có hỗ trợ phân trang và tìm kiếm
  getBlogsWithPagination(page: number, limit: number, searchTerm: string = ''): Observable<any> {
    const url = `${this.apiUrl}/query?page=${page}&limit=${limit}&search=${searchTerm}`;
    return this.http.get<any>(url);
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

  // Phương thức lấy bình luận của một blog
  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${id}/comments`);
  }

  // Phương thức thêm bình luận vào một blog
  addComment(id: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${id}/comments`, comment);
  }

  // Phương thức thêm phản hồi vào bình luận
  addReply(id: string, commentId: string, reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(`${this.apiUrl}/${id}/comments/${commentId}/replies`, reply);
  }
}
