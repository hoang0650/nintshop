// src/app/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://sale-nest-api.onrender.com/api/reviews';
  // private apiUrl = 'http://localhost:3000/api/reviews'; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách đánh giá theo productId
  getReviewsByProduct(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}/`);
  }

  // Thêm mới đánh giá
  addReview(review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, review);
  }
}
