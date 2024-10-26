import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { SeoService } from '../../services/seo.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  selectedPrices: string[] = [];
  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  selectedCategory!: string;
  searchTerm: string = '';
  selectedSort: string = ''; // Khai báo thuộc tính selectedSort
  itemsPerPage = 9; // Số lượng sản phẩm trên mỗi trang
  currentPage = 1; // Trang hiện tạ

  products: any[] = []; // Giả sử đây là danh sách sản phẩm từ service
  filteredProducts: any[] = [];
  constructor(private seoService: SeoService ,private messageService: MessageService, private route: ActivatedRoute,public productService: ProductService,private cartService: CartService) { }

  ngOnInit(): void {
    this.seoService.setSocialShareTags({
      title: 'Nintshop | trang mua sắm, thương mại và đăng tin hàng đầu',
      description: 'Trang đăng tin bất động sản, mua sắm, thương mại hàng đầu tại nintshop.com.',
      image: 'https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0',
      url: 'www.nintshop.com',
    });
    // Lấy danh sách sản phẩm và lọc sản phẩm khi có thay đổi queryParams
    this.productService.products$.subscribe(products => {
      this.products = products;
      // Sao chép toàn bộ danh sách sản phẩm
      this.filteredProducts = [...this.products];
      this.applyPagination();
      // Lắng nghe thay đổi queryParams
      this.route.queryParams.subscribe(params => {
        this.selectedCategory = params['type'];
        
        // Kiểm tra nếu có category được chọn thì lọc sản phẩm
        if (this.selectedCategory) {
          this.filteredProducts = this.products.filter(product => {
            // So sánh loại sản phẩm với category đã chọn
            return product.type.toLowerCase() === this.selectedCategory.toLowerCase();
          });
        } else {
          // Nếu không có category được chọn, hiển thị toàn bộ sản phẩm
          this.filteredProducts = [...this.products];
        }
      });
    });
  }
  

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  sortByLatest(): void {
    this.filteredProducts.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  }

  sortByPopularity(): void {
    this.filteredProducts.sort((a, b) => b.popularity - a.popularity);
  }

  sortByBestRating(): void {
    this.filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  // Hàm lọc sản phẩm dựa trên giá, màu sắc và kích thước
  // applyFilters() {
  //   this.filteredProducts = this.products.filter(product => {
  //     const priceMatch = this.selectedPrices.length === 0 || this.selectedPrices.includes(this.getPriceRange(product.price));
  //     const colorMatch = this.selectedColors.length === 0 || this.selectedColors.includes(product.color);
  //     const sizeMatch = this.selectedSizes.length === 0 || this.selectedSizes.includes(product.size);
  //     return priceMatch && colorMatch && sizeMatch;
  //   });
  // }
  applyFilters() {
    // Lọc theo giá, màu sắc, kích thước
    this.filteredProducts = this.products.filter(product => {
      const priceMatch = this.selectedPrices.length === 0 || this.selectedPrices.includes(this.getPriceRange(product.price));
      const colorMatch = this.selectedColors.length === 0 || this.selectedColors.includes(product.color);
      const sizeMatch = this.selectedSizes.length === 0 || this.selectedSizes.includes(product.size);
      const typeMatch = product.type.toLowerCase().includes(this.searchTerm);
      const nameMatch = product.name.toLowerCase().includes(this.searchTerm);
      return priceMatch && colorMatch && sizeMatch && nameMatch && typeMatch;
    });
  
    // Sắp xếp sau khi đã lọc
    if (this.selectedSort === 'latest') {
      this.sortByLatest();
    } else if (this.selectedSort === 'popularity') {
      this.sortByPopularity();
    } else if (this.selectedSort === 'bestRating') {
      this.sortByBestRating();
    }
  }

  // Xác định khoảng giá của sản phẩm
  getPriceRange(price: number): string {
    if (price <= 100000) return '1000-100000';
    if (price > 100000 && price <= 500000) return '101000-500000';
    if (price > 500000 && price <= 2000000) return '501000-2000000';
    if (price > 2000000 && price <= 5000000) return '2010000-5000000';
    if (price > 5000000 && price <= 50000000) return '5010000-50000000000';
    return 'all';
  }

  // Hàm xử lý khi giá được chọn/deselect
  onPriceChange(event: any, range: string) {
    if (event.target.checked) {
      this.selectedPrices.push(range);
    } else {
      this.selectedPrices = this.selectedPrices.filter(price => price !== range);
    }
    this.applyFilters();
  }

  // Hàm xử lý khi màu được chọn/deselect
  onColorChange(event: any, color: string) {
    if (event.target.checked) {
      this.selectedColors.push(color);
    } else {
      this.selectedColors = this.selectedColors.filter(c => c !== color);
    }
    this.applyFilters();
  }

  // Hàm xử lý khi kích thước được chọn/deselect
  onSizeChange(event: any, size: string) {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    }
    this.applyFilters();
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
}