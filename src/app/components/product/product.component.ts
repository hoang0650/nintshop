import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MessageService } from '../../services/message.service';
import { ProductApiService } from '../../services/product-api.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Đảm bảo rằng styleUrls là dạng số nhiều
})
export class ProductComponent implements OnInit {
  constructor(public productService: ProductApiService, private cartService: CartService, private messageService: MessageService) { }
  products: any[] = [];
  searchTerm = '';             // Từ khóa tìm kiếm
  currentPage = 1; // Trang hiện tạ
  totalBlogs = 0;              // Tổng số bài blog
  pageSize = 24;               // Số lượng blog mỗi trang
  isLoading = false;           // Trạng thái loading
  filteredProducts: any[] = [];

  ngOnInit(): void {
    this.loadProducts(this.currentPage);  // Load blog ban đầu
  }

  // Tải blog theo trang và tìm kiếm (nếu có)
  loadProducts(page: number) {
    this.isLoading = true;
    this.productService.getProductsWithPagination(page, this.pageSize, this.searchTerm).subscribe(
      (data) => {
        this.products = data.products;
        this.totalBlogs = data.totalCount;
        this.filteredProducts = [...this.products]; // Sao chép dữ liệu blogs vào filteredBlogs
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching blogs:', error);
        this.isLoading = false;
      }
    );
  }

  // Sự kiện khi thay đổi trang
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts(page);
  }

  // Sự kiện khi tìm kiếm
  onSearch() {
    this.currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
    this.loadProducts(this.currentPage);
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
