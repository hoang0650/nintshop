import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  selectedPrices: string[] = [];
  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  searchTerm: string = '';
  selectedSort: string = ''; // Khai báo thuộc tính selectedSort

  products: any[] = []; // Giả sử đây là danh sách sản phẩm từ service
  filteredProducts: any[] = [];
  constructor(public productService: ProductService,private cartService: CartService) { }

  ngOnInit(): void {
    // Initialize with all products
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.filteredProducts = [...this.products]; // Sao chép danh sách ban đầu
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
      const nameMatch = product.name.toLowerCase().includes(this.searchTerm);
      return priceMatch && colorMatch && sizeMatch && nameMatch;
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
    if (price <= 100) return '0-100';
    if (price > 100 && price <= 200) return '100-200';
    if (price > 200 && price <= 300) return '200-300';
    if (price > 300 && price <= 400) return '300-400';
    if (price > 400 && price <= 500) return '400-500';
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

  onSelect(product: number): void {
    // this.productService.setSelectedProduct(product)
    const selectedProduct = this.productService.getProductById(product)
  }
  // Hàm thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  }
}