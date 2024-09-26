import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable()
  // products$ = this.apiService.loadData<any>('rooms');

  constructor() {
    // Mô phỏng việc tải dữ liệu từ server
    this.loadProducts();
  }

  private loadProducts() {
    // Cách 1: Data Set Cứng
    // Giả sử có một API hoặc dữ liệu từ server
    const fakeServerData = [
      { id: 1, name: 'Yến thô - 100gr', description: 'Tổ Yến thô được hái trực tiếp từ nhà yến đảm bảo nguyên chất chưa qua bất kỳ quy trình xử lý nào. Tổ yến vẫn còn nguyên lông và các tạp chất tự nhiên. Người mua sẽ cần sơ chế và làm sạch yến trước khi sử dụng.', price: 2000000, image:'img/product-1.jpg',quantity:1 },
      { id: 2, name: 'Yến sơ chế - 100gr', description: 'Tổ Yến sơ chế đã được làm sạch một phần, loại bỏ lông và tạp chất, nhưng vẫn giữ nguyên cấu trúc sợi yến tự nhiên. Người mua chỉ cần sơ chế lại một chút trước khi sử dụng, tiết kiệm thời gian hơn so với yến thô.', price: 2400000, image:'img/product-2.jpg',quantity:1 },
      { id: 3, name: 'Yến tinh chế - 100gr', description: 'Tổ Yến tinh chế đã được làm sạch hoàn toàn, loại bỏ lông, bụi bẩn và các tạp chất khác. Sợi yến được tách nhỏ và đúc lại thành dạng tổ yến nguyên vẹn. Loại yến này không cần sơ chế thêm, có thể sử dụng ngay.', price: 3300000, image:'img/product-3.jpg',quantity:1 },
      // { id: 4, name: 'Product 1', description: 'Description 4' },
      // { id: 5, name: 'Product 2', description: 'Description 5' },
      // { id: 6, name: 'Product 3', description: 'Description 6' },
      // { id: 7, name: 'Product 1', description: 'Description 7' },
      // { id: 8, name: 'Product 2', description: 'Description 8' },
     
    ];


    // Cập nhật dữ liệu trong BehaviorSubject
    this.productsSource.next(fakeServerData);
    
  }

  loadUpdatedData() {
    this.loadProducts();
  }
  
  updateProducts(newData: any[]): void {
    this.productsSource.next(newData);
  }

  // updateProducts(updatedProduct: any): Observable<any> {
  //   const currentProducts = this.productsSource.value;

  //   // Find the index of the product in the local array
  //   const index = currentProducts.findIndex(product => product.roomNumber === updatedProduct.roomNumber);

  //   if (index !== -1) {
  //     // Update the local array
  //     const updatedProducts = [...currentProducts];
  //     updatedProducts[index] = { ...updatedProduct };
  //     this.productsSource.next(updatedProducts);
  //     // Update the product in the API
  //     return this.http.put<any>('https://hotel-app-smp2.onrender.com/checkin' + updatedProduct.roomNumber, updatedProduct)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error updating room:', error);
  //         return of(null); // Return an observable that emits null in case of an error
  //       })
  //     );
  // }

  // // If the product is not found, return an observable that emits null
  // return of(null); // Handle error if the product is not found
  // }

  setSelectedProduct(product: any): void {
    this.productsSource.next(product);
  }

  getSelectedProduct(): Observable<any> {
    return this.productsSource.asObservable();
  }

  getProductById(id: any): any {
    // Lấy sản phẩm từ dữ liệu hiện tại
    const currentProducts = this.productsSource.value;
    return currentProducts.find(product => product.id === id);
  }


}
