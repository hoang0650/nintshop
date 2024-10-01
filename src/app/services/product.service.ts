import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable();
  // https://sale-nest-api.onrender.com/api/products
  // http://localhost:3000/api/products/
  constructor(private http: HttpClient) {
    // Tải dữ liệu từ server khi khởi tạo service
    this.loadProducts();
  }

  // Tải tất cả sản phẩm từ API
  private loadProducts() {
    this.http.get<any[]>('https://sale-nest-api.onrender.com/api/products').subscribe(
      data => {
        this.productsSource.next(data);
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  // Lấy danh sách sản phẩm theo query tìm kiếm
  getProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`https://sale-nest-api.onrender.com/api/products?search=${query}`);
  }

  // Cập nhật lại dữ liệu sản phẩm khi có thay đổi
  loadUpdatedData() {
    this.loadProducts();
  }

  // Thêm sản phẩm mới
  addProduct(newProduct: any): Observable<any> {
    return this.http.post<any>('https://sale-nest-api.onrender.com/api/products', newProduct).pipe(
      catchError(error => {
        console.error('Error adding product:', error);
        return of(null); // Handle error bằng cách trả về null
      })
    );
  }

  // Cập nhật thông tin sản phẩm
  updateProduct(updatedProduct: any): Observable<any> {
    return this.http.put<any>(`https://sale-nest-api.onrender.com/api/products/${updatedProduct.id}`, updatedProduct).pipe(
      catchError(error => {
        console.error('Error updating product:', error);
        return of(null); // Handle error bằng cách trả về null
      })
    );
  }

  // Xóa sản phẩm theo ID
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`https://sale-nest-api.onrender.com/api/products/${productId}`).pipe(
      catchError(error => {
        console.error('Error deleting product:', error);
        return of(null); // Handle error bằng cách trả về null
      })
    );
  }

  // Lấy sản phẩm theo ID từ BehaviorSubject
  getProductById(id: number): any {
    const currentProducts = this.productsSource.value;
    return currentProducts.find(product => product.id === id);
  }

  // Đặt sản phẩm được chọn
  setSelectedProduct(product: any): void {
    this.productsSource.next(product);
  }

  // Lấy sản phẩm được chọn
  getSelectedProduct(): Observable<any> {
    return this.productsSource.asObservable();
  }
}
