import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Đảm bảo rằng styleUrls là dạng số nhiều
})
export class ProductComponent {
  constructor(public productService: ProductService, private cartService: CartService) { }

  onSelect(product: number): void {
    this.productService.setSelectedProduct(product)
    // const selectedProduct = this.productService.getProductById(product)
  }
  // Hàm thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  }
}
