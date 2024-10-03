import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../services/product-api.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'] // Đã sửa typo từ 'styleUrl' thành 'styleUrls'
})
export class DetailComponent implements OnInit {
  product: any;
  cartItems: any[] = [];
  selectedVariant: any;

  constructor(
    private productService: ProductApiService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(
        (data: Product) => {
          this.product = data;
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  }

  selectVariant(variant: any) {
    this.selectedVariant = variant;
  }
}
