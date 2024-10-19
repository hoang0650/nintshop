import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductApiService } from '../../services/product-api.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  isMobile: boolean = false;
  deadline = new Date().getTime() + 1000 * 60 * 60 * 2; // 2 hours from now
  products: Product[] = [];

  constructor(private productService: ProductApiService) {}

  // products = [
  //   {
  //     name: 'Product 1',
  //     imageUrl: 'nintshop_img/001/001-Pikachu.png',
  //     discountedPrice: 80,
  //     originalPrice: 100,
  //     discountPercentage: 20,
  //     sold: 120,
  //     soldPercent: 60, // Tỉ lệ phần trăm số lượng đã bán
  //     dealEndTime: new Date().getTime() + 5000000,
  //     rating: 4.5,
  //     reviews: 230
  //   },
  //   {
  //     name: 'Product 2',
  //     imageUrl: 'nintshop_img/001/001-Pikachu.png',
  //     discountedPrice: 150,
  //     originalPrice: 200,
  //     discountPercentage: 25,
  //     sold: 95,
  //     soldPercent: 47,
  //     dealEndTime: new Date().getTime() + 10000000,
  //     rating: 4.0,
  //     reviews: 180
  //   },
  //   {
  //     name: 'Product 3',
  //     imageUrl: 'nintshop_img/001/001-Pikachu.png',
  //     discountedPrice: 250,
  //     originalPrice: 300,
  //     discountPercentage: 17,
  //     sold: 75,
  //     soldPercent: 50,
  //     dealEndTime: new Date().getTime() + 15000000,
  //     rating: 3.5,
  //     reviews: 125
  //   },
  //   {
  //     name: 'Product 4',
  //     imageUrl: 'nintshop_img/001/001-Pikachu.png',
  //     discountedPrice: 350,
  //     originalPrice: 400,
  //     discountPercentage: 13,
  //     sold: 230,
  //     soldPercent: 92,
  //     dealEndTime: new Date().getTime() + 20000000,
  //     rating: 4.8,
  //     reviews: 300
  //   },
  //   {
  //     name: 'Product 5',
  //     imageUrl: 'nintshop_img/001/001-Pikachu.png',
  //     discountedPrice: 450,
  //     originalPrice: 500,
  //     discountPercentage: 10,
  //     sold: 180,
  //     soldPercent: 72,
  //     dealEndTime: new Date().getTime() + 25000000,
  //     rating: 4.7,
  //     reviews: 275
  //   },
  //   {
  //     name: 'Product 6',
  //     imageUrl: 'nintshop_img/001/001-Pikachu.png',
  //     discountedPrice: 550,
  //     originalPrice: 600,
  //     discountPercentage: 8,
  //     sold: 130,
  //     soldPercent: 52,
  //     dealEndTime: new Date().getTime() + 30000000,
  //     rating: 4.2,
  //     reviews: 200
  //   },
  //   {
  //     name: 'Product 7',
  //     imageUrl: 'nintshop_img/001/001-Pikachu.png',
  //     discountedPrice: 350,
  //     originalPrice: 400,
  //     discountPercentage: 13,
  //     sold: 230,
  //     soldPercent: 92,
  //     dealEndTime: new Date().getTime() + 20000000,
  //     rating: 4.8,
  //     reviews: 300
  //   },
  //   {
  //     name: 'Product 8',
  //     imageUrl: 'nintshop_img/001/001-Pikachu.png',
  //     discountedPrice: 450,
  //     originalPrice: 500,
  //     discountPercentage: 10,
  //     sold: 180,
  //     soldPercent: 72,
  //     dealEndTime: new Date().getTime() + 25000000,
  //     rating: 4.7,
  //     reviews: 275
  //   },
  //   {
  //     name: 'Product 9',
  //     imageUrl: 'nintshop_img/001/001-Pikachu.png',
  //     discountedPrice: 550,
  //     originalPrice: 600,
  //     discountPercentage: 8,
  //     sold: 130,
  //     soldPercent: 52,
  //     dealEndTime: new Date().getTime() + 30000000,
  //     rating: 4.2,
  //     reviews: 200
  //   }
  // ];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  ngOnInit() {
    this.checkIfMobile();
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({
      left: -200, // Số pixel để cuộn
      behavior: 'smooth' // Hiệu ứng cuộn mượt mà
    });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({
      left: 200, // Số pixel để cuộn
      behavior: 'smooth' // Hiệu ứng cuộn mượt mà
    });
  }

  onScroll() {
    // You can add logic here to handle scroll events if needed
  }

  calculateSoldPercent(product: Product): number {
    // Assuming a maximum of 100 items per product
    const maxItems = 100;
    return (product.sold / maxItems) * 100;
  }
}
