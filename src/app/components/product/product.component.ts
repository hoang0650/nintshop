import { Component,OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Đảm bảo rằng styleUrls là dạng số nhiều
})
export class ProductComponent implements OnInit {
  constructor(public productService: ProductService, private cartService: CartService, private messageService: MessageService) { }
  products: any[] = [];

  ngOnInit(): void {
    // Initialize with all products
    this.productService.products$.subscribe(products => {
      this.products = products;
    });
  }

  onSelect(product: string): void {
    // this.productService.setSelectedProduct(product)
    const selectedProduct = this.productService.getProductById(product)
  }

  // Hàm thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.messageService.addMessage('success', 'Bạn đã thêm giỏ hàng thành công!');
  }
}
