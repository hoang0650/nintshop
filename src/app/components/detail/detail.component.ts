import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

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
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id']; // Lấy ID dưới dạng chuỗi
      this.product = this.productService.getProductById(productId); // Gọi hàm với ID chuỗi
    });
    this.route.data.subscribe(data => {
      // Assuming data.room contains room details
      // this.room = data.room;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  }

  selectVariant(variant: any) {
    this.selectedVariant = variant;
  }
}
