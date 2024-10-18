import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ProductApiService } from '../../services/product-api.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'] // Đã sửa typo từ 'styleUrl' thành 'styleUrls'
})
export class DetailComponent implements OnInit, OnDestroy {
  @ViewChild('imageList') imageList!: ElementRef;
  @ViewChild('imageListContainer') imageListContainer!: ElementRef;
  product: any;
  cartItems: any[] = [];
  selectedVariant: any;
  currentImageIndex = 0;
  selectedImage: string = ''
  selectedColor: string = '';
  private subscriptions: Subscription = new Subscription(); // Biến để lưu các subscriptions
  constructor(
    private productService: ProductApiService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const detailSub = this.productService.getProductById(id).subscribe(
        (data: Product) => {
          this.product = data;
          this.selectedImage = this.product.image[0];
          this.selectedColor = this.product.colors[0];
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
      this.subscriptions.add(detailSub); // Thêm subscription vào danh sách
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Hủy tất cả các subscription
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  }

  selectVariant(variant: any) {
    this.selectedVariant = variant;
  }

  selectImage(index: number) {
    this.selectedImage = this.product.image[index];
  }

  setCurrentImage(index: number) {
    this.currentImageIndex = index;
  }

  scrollImages(direction: 'left' | 'right') {
    const container = this.imageListContainer.nativeElement;
    const list = this.imageList.nativeElement;
    const scrollAmount = container.clientWidth;

    if (direction === 'left') {
      list.style.transform = `translateX(${Math.min(0, list.getBoundingClientRect().left - container.getBoundingClientRect().left + scrollAmount)}px)`;
    } else {
      list.style.transform = `translateX(${Math.max(container.clientWidth - list.clientWidth, list.getBoundingClientRect().left - container.getBoundingClientRect().left - scrollAmount)}px)`;
    }
  }


  incrementClickCount(event: MouseEvent, productId: string) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của link
    this.productService.incrementClickCount(productId).subscribe(
      response => {
        console.log('Click count updated:', response.clickCount);
        if (this.product) {
          this.product.clickCount = response.clickCount;
        }
        // Chuyển hướng đến link tiếp thị liên kết
        window.open(this.product.affiliateLink, '_blank');
      },
      error => {
        console.error('Error updating click count:', error);
        // Vẫn chuyển hướng đến link tiếp thị liên kết ngay cả khi có lỗi
        window.open(this.product.affiliateLink, '_blank');
      }
    );
  }
}
