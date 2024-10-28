import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ProductApiService } from '../../services/product-api.service';
import { ActivatedRoute } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'] // Đã sửa typo từ 'styleUrl' thành 'styleUrls'
})
export class DetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageList') imageList!: ElementRef;
  @ViewChild('imageListContainer') imageListContainer!: ElementRef;
  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef;
  product: any;
  relatedProducts: any[]=[];
  cartItems: any[] = [];
  selectedVariant: any;
  currentImageIndex = 0;
  selectedImage: string = ''
  selectedColor: string = '';
  sliderValue = 0; // Giá trị mặc định cho slider
  private subscriptions: Subscription = new Subscription(); // Biến để lưu các subscriptions
  private thumbnailScroll = 0;
  private readonly thumbnailWidth = 80; // Width của mỗi thumbnail
  private readonly thumbnailGap = 8;  // Khoảng cách giữa các thumbnails
  private readonly scrollStep = this.thumbnailWidth + this.thumbnailGap; // Khai báo scrollStep một lần
  private scrollAmount = 0;
  private isAnimating = false;
  quantity: number = 1;
  hasInsurance: boolean = false;
  insurancePrice: number = 39000;
  selectedLocation: string = 'Hà Nội';
  shippingFee: number = 20000;
  
  locations: string[] = [
    'Hà Nội',
    'TP. Hồ Chí Minh',
    'Đà Nẵng',
    // Thêm các thành phố khác
  ];

  insuranceInfo: string = `
    Bảo hiểm thiết bị điện tử
    - Bảo vệ thiết bị khỏi rơi vỡ, va đập
    - Bảo hành mở rộng lên đến 12 tháng
    - Chi phí sửa chữa lên đến 100% giá trị sản phẩm
  `;

  zoomLevel: number = 2.5;
  isZoomed: boolean = false;
  mousePosition = { x: 0, y: 0 };

  zoomEnabled: boolean = false;
  zoomPosition = { x: 0, y: 0 };
  zoomScale: number = 2.5;
  touchStartX: number = 0;
  currentTranslate: number = 0;
  isDragging: boolean = false;

  constructor(
    private productService: ProductApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cartService: CartService,
    private seoService: SeoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const detailSub = this.productService.getProductById(id).subscribe(
        (data: Product) => {
          this.product = data;
          this.seoService.setSocialShareTags({
            title: data.name,
            description: data.description,
            image: 'https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0',
            url: 'www.nintshop.com',
          });
          this.selectedImage = this.product.image[0];
          this.selectedColor = this.product.colors[0];
          // Lấy danh sách sản phẩm liên quan
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
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
      this.subscriptions.add(detailSub); // Thêm subscription vào danh sách
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Hủy tất cả các subscription
  }

  getSlides(): any[] {
    const slides = [];
    for (let i = 0; i < this.relatedProducts.length; i += 4) {
      slides.push(this.relatedProducts.slice(i, i + 4)); // Chia sản phẩm thành các slide
    }
    return slides;
  }

  navigateToProduct(productId: string) {
    window.location.href = `/detail/${productId}`;
  }

  addToCart(product: any) {
    if (this.selectedVariant) {
      const item: CartItem = {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: this.quantity,
        image: product.image[0],
        variants: { ...this.selectedVariant },
        hasInsurance: this.hasInsurance,
        insurancePrice: this.hasInsurance ? this.insurancePrice : 0
      };
      this.cartService.addToCart(item);
      this.messageService.addMessage('success', 'Đã thêm vào giỏ hàng!');
    } else {
      this.messageService.addMessage('warning', 'Vui lòng chọn phiên bản sản phẩm');
    }
  }

  selectVariant(variant: { size: string; color: string }) {
    this.selectedVariant = variant;
    if (this.product) {
      const variantIndex = this.product.variants.indexOf(variant);
      const imageIndex = variantIndex + 1;
      if (imageIndex < this.product.image.length) {
        this.selectedImage = this.product.image[imageIndex];
      }
    }
  }

  onSliderChange(value: number): void {
    this.selectedImage = this.product.image[value]; // Cập nhật hình ảnh đã chọn
  }

  selectImage(image: string, index: number): void {
    this.selectedImage = image;
    this.currentImageIndex = index;
    this.zoomEnabled = false;

    // Tính toán vị trí scroll để đưa thumbnail được chọn vào giữa
    const thumbnailsWrapper = document.querySelector('.thumbnails-wrapper') as HTMLElement;
    if (!thumbnailsWrapper) return;

    const containerWidth = thumbnailsWrapper.clientWidth;
    const targetScroll = (index * this.scrollStep) - (containerWidth - this.thumbnailWidth) / 2;
    
    // Giới hạn scroll trong phạm vi cho phép
    const thumbnailsEl = document.querySelector('.thumbnails') as HTMLElement;
    const maxScroll = thumbnailsEl.scrollWidth - containerWidth;
    this.scrollAmount = Math.max(0, Math.min(targetScroll, maxScroll));

    // Áp dụng scroll với animation
    thumbnailsEl.style.transition = 'transform 0.3s ease';
    thumbnailsEl.style.transform = `translateX(-${this.scrollAmount}px)`;

    // Reset transition sau khi animation hoàn thành
    setTimeout(() => {
      thumbnailsEl.style.transition = '';
    }, 300);

    this.updateNavigationButtons();
  }

  private updateNavigationButtons(): void {
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const thumbnailsEl = document.querySelector('.thumbnails') as HTMLElement;
    
    if (!thumbnailsEl || !prevBtn || !nextBtn) return;

    const containerWidth = thumbnailsEl.parentElement!.clientWidth;
    const maxScroll = thumbnailsEl.scrollWidth - containerWidth;

    // Cập nhật trạng thái nút prev
    if (prevBtn instanceof HTMLElement) {
      prevBtn.classList.toggle('disabled', this.scrollAmount <= 0);
    }

    // Cập nhật trạng thái nút next
    if (nextBtn instanceof HTMLElement) {
      nextBtn.classList.toggle('disabled', this.scrollAmount >= maxScroll);
    }
  }

  handleImageZoom(event: MouseEvent): void {
    if (!this.mainImageContainer || window.innerWidth <= 768) return;

    const container = this.mainImageContainer.nativeElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.zoomEnabled = true;
    this.zoomPosition = {
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    };
  }

  handleMouseLeave(): void {
    this.isZoomed = false;
  }

  handleThumbnailScroll(direction: 'left' | 'right'): void {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    if (!thumbnailsContainer) return;

    const scrollAmount = 100; // Điều chỉnh khoảng cách scroll
    const currentScroll = thumbnailsContainer.scrollLeft;
    
    thumbnailsContainer.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  }

  checkScrollPosition(): void {
    const container = document.querySelector('.thumbnails');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    if (!container || !prevBtn || !nextBtn) return;

    // Hiển thị/ẩn nút prev
    if (container.scrollLeft <= 0) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }

    // Hiển thị/ẩn nút next
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  }

  scrollThumbnails(direction: 'prev' | 'next'): void {
    if (this.isAnimating) return;
    
    const thumbnailsEl = document.querySelector('.thumbnails') as HTMLElement;
    if (!thumbnailsEl) return;

    const containerWidth = thumbnailsEl.parentElement!.clientWidth;
    const maxScroll = thumbnailsEl.scrollWidth - containerWidth;
    
    this.isAnimating = true;
    
    if (direction === 'prev') {
      this.scrollAmount = Math.max(this.scrollAmount - this.scrollStep, 0);
    } else {
      this.scrollAmount = Math.min(this.scrollAmount + this.scrollStep, maxScroll);
    }

    thumbnailsEl.style.transform = `translateX(-${this.scrollAmount}px)`;
    
    // Cập nhật trạng thái nút điều hướng
    this.updateNavigationButtons();
    
    // Reset trạng thái animation sau khi hoàn thành
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  ngAfterViewInit() {
    this.preloadImages();
    this.initializeImageHandlers();
  }

  private preloadImages(): void {
    if (this.product?.image) {
      this.product.image.forEach((src: string) => {
        const img = new Image();
        img.src = src;
      });
    }
  }

  private initializeImageHandlers(): void {
    const container = this.mainImageContainer?.nativeElement;
    if (!container) return;

    // Xử lý zoom trên desktop
    container.addEventListener('mousemove', (e: MouseEvent) => this.handleImageZoom(e));
    container.addEventListener('mouseleave', () => this.zoomEnabled = false);

    // Xử lý touch events trên mobile
    const thumbnails = document.querySelector('.thumbnails');
    if (thumbnails) {
      thumbnails.addEventListener('touchstart', (e: Event) => {
        if (e instanceof TouchEvent) {
          this.handleTouchStart(e);
        }
      });

      thumbnails.addEventListener('touchmove', (e: Event) => {
        if (e instanceof TouchEvent) {
          this.handleTouchMove(e);
        }
      });

      thumbnails.addEventListener('touchend', (e: Event) => {
        if (e instanceof TouchEvent) {
          this.handleTouchEnd();
        }
      });
    }
  }

  private initializeZoom(): void {
    const container = document.querySelector('.main-image-container') as HTMLElement;
    const overlay = document.querySelector('.zoom-overlay') as HTMLElement;
    const result = document.querySelector('.zoom-result') as HTMLElement;
    const mainImage = document.querySelector('.main-product-image') as HTMLImageElement;

    if (!container || !overlay || !result || !mainImage) return;

    container.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        overlay.style.display = 'block';
        result.style.display = 'block';
      }
    });

    container.addEventListener('mouseleave', () => {
      overlay.style.display = 'none';
      result.style.display = 'none';
    });

    container.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate positions
      const overlayWidth = overlay.offsetWidth;
      const overlayHeight = overlay.offsetHeight;

      let overlayX = x - overlayWidth / 2;
      let overlayY = y - overlayHeight / 2;

      // Constrain overlay position
      overlayX = Math.max(0, Math.min(overlayX, rect.width - overlayWidth));
      overlayY = Math.max(0, Math.min(overlayY, rect.height - overlayHeight));

      // Position overlay
      overlay.style.left = `${overlayX}px`;
      overlay.style.top = `${overlayY}px`;

      // Update zoom result
      const zoomRatio = 2.5;
      result.style.backgroundImage = `url(${mainImage.src})`;
      result.style.backgroundSize = `${rect.width * zoomRatio}px ${rect.height * zoomRatio}px`;
      result.style.backgroundPosition = `-${overlayX * zoomRatio}px -${overlayY * zoomRatio}px`;
    });
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

  carouselConfig = {
    dots: false,
    nzAutoPlay: true,
    nzAutoPlaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    if (this.quantity < (this.product?.stock || 999)) {
      this.quantity++;
    }
  }

  calculateTotalPrice(): number {
    let total = this.product?.price * this.quantity;
    if (this.hasInsurance) {
      total += this.insurancePrice;
    }
    return total + this.shippingFee;
  }

  handleTouchStart(event: TouchEvent): void {
    event.preventDefault(); // Ngăn chặn scroll mặc định
    this.touchStartX = event.touches[0].clientX;
    this.isDragging = true;
  }

  handleTouchMove(event: TouchEvent): void {
    event.preventDefault(); // Ngăn chặn scroll mặc định
    if (!this.isDragging) return;

    const currentX = event.touches[0].clientX;
    const diff = currentX - this.touchStartX;
    const thumbnails = document.querySelector('.thumbnails') as HTMLElement;
    
    if (thumbnails) {
      const newTranslate = this.currentTranslate + diff;
      const maxTranslate = thumbnails.scrollWidth - thumbnails.clientWidth;
      
      if (newTranslate <= 0 && Math.abs(newTranslate) <= maxTranslate) {
        thumbnails.style.transform = `translateX(${newTranslate}px)`;
      }
    }
  }

  handleTouchEnd(): void {
    this.isDragging = false;
    const thumbnails = document.querySelector('.thumbnails') as HTMLElement;
    if (thumbnails) {
      const matrix = new WebKitCSSMatrix(getComputedStyle(thumbnails).transform);
      this.currentTranslate = matrix.m41;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    // Reset scroll amount khi resize window
    this.scrollAmount = 0;
    const thumbnailsEl = document.querySelector('.thumbnails') as HTMLElement;
    if (thumbnailsEl) {
      thumbnailsEl.style.transform = 'translateX(0)';
    }
    this.updateNavigationButtons();
  }
}
