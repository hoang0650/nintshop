import { Component, OnInit, Input } from '@angular/core';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit {
  @Input() relatedProducts: Product[] = []; // Nhận dữ liệu từ component cha

  constructor(
    private productService: ProductApiService, 
    private cartService: CartService,
    private messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Lấy ID sản phẩm từ URL
    if (id) {
      this.productService.getRelatedProducts(id).subscribe(
        (products) => {
          this.relatedProducts = products; // Cập nhật danh sách sản phẩm liên quan
          console.log('relatedProducts', this.relatedProducts);
        },
        (error) => {
          console.error('Error fetching related products:', error);
        }
      );
    }
  }

  getSlides(): any[] {
    const slides = [];
    for (let i = 0; i < this.relatedProducts.length; i += 4) {
      slides.push(this.relatedProducts.slice(i, i + 4)); // Chia sản phẩm thành các slide
    }
    return slides;
  }

  navigateToProduct(productId: string) {
    this.router.navigate(['/detail', productId]); // Điều hướng đến chi tiết sản phẩm
  }

  // Hàm thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.messageService.addMessage('success', 'Bạn đã thêm giỏ hàng thành công!');
  }
}
