import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
// import * as XLSX from 'xlsx';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private productDataUpdated$ = new BehaviorSubject<any>(null);
  private apiUrl = 'https://sale-nest-api.onrender.com/api/products';
  // private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Lấy danh sách sản phẩm theo query tìm kiếm
  getProductsSearch(query: string): Observable<any[]> {
    return this.http.get<any[]>(`https://sale-nest-api.onrender.com/api/products?search=${query}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  incrementClickCount(productId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${productId}/clicks`, {});
  }

  updateProduct(id: string, formData: any): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductDataUpdated$() {
    return this.productDataUpdated$.asObservable();
  }

  uploadImages(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.post('https://sale-nest-api.onrender.com/api/upload/image', formData);
  }

  getImage(imageId: string): Observable<Blob> {
    return this.http.get(`https://sale-nest-api.onrender.com/api/upload/image/${imageId}`, { responseType: 'blob' });
  }

  // Call this method after checkin/checkout to notify subscribers
  notifyProductDataUpdated() {
    this.productDataUpdated$.next(null);
  }
}
