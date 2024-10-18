import { Component, OnInit } from '@angular/core';
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
  itemsPerPage = 24; // Số lượng sản phẩm trên mỗi trang
  currentPage = 1; // Trang hiện tạ
  filteredProducts: any[] = [];

  ngOnInit(): void {
    // Initialize with all products
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.filteredProducts = [...this.products];
      this.applyPagination();
    });
  }
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredProducts = this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages().length) {
      return;
    }
    this.currentPage = page;
    this.applyPagination();
  }

  totalPages() {
    return Array(Math.ceil(this.products.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
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
