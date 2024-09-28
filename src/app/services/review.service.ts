// src/app/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://sale-nest-api.onrender.com/reviews';
  // private apiUrl = 'http://localhost:3000/reviews'; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách đánh giá cho sản phẩm
  getReviews(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}`);
  }

  // Gửi đánh giá mới
  postReview(review: any): Observable<any> {
    return this.http.post(this.apiUrl, review);
  }
}
