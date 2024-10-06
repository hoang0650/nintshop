import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0; // Biến để lưu số lượng sản phẩm trong giỏ hàng
  currentLanguage: string;
  products: any
  isLoggedIn: boolean = false
  isAdmin: boolean = false;
  isSticky: boolean = false;
  infor: any;
  searchTerm: string = '';
  filteredProducts: any
  public showDropdown = false;  // Biến để hiển thị hoặc ẩn dropdown
  constructor(private router: Router,private eRef: ElementRef,public productService: ProductService, private cartService: CartService, private languageService: LanguageService, private translate: TranslateService, private userService: UserService) {
    this.currentLanguage = 'vi'; // Ngôn ngữ mặc định
    this.translate.setDefaultLang(this.currentLanguage);
    this.userInfor()

  }

  ngOnInit(): void {
    // Lắng nghe sự thay đổi ngôn ngữ từ LanguageService
    this.languageService.currentLanguage.subscribe(lang => {
      this.currentLanguage = lang;
      this.translate.use(lang); // Cập nhật ngôn ngữ cho dịch vụ dịch
    });
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = this.cartService.getTotalItemCount();
    });
    this.userService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status
      this.userInfor()
    })
    // Initialize with all products
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.filteredProducts = [...this.products]; // Sao chép danh sách ban đầu
    });
  }
  categories = [
    { name: 'keychain', id: 1 },
    { name: 'sticker', id: 2 },
    // Các category khác
  ];

  onCategorySelect(category: any) {
    // Chuyển hướng tới ShopComponent với type là category đã chọn
    this.router.navigate(['/shop'], { queryParams: { type: category.name } });
  }

  selectLanguage(language: string): void {
    this.languageService.changeLanguage(language); // Gọi hàm để thay đổi ngôn ngữ
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    // Lọc theo giá, màu sắc, kích thước
    this.filteredProducts = this.products.filter((product:any) => {
      const nameMatch = product.name.toLowerCase().includes(this.searchTerm);
      const typeMatch = product.type.toLowerCase().includes(this.searchTerm);
      return nameMatch && typeMatch;
    });
  }

  onCategory(){

  }
  

  logOut() {
    localStorage.removeItem('access_token')
    this.userService.logout()
    this.isLoggedIn = false

  }

  userInfor() {
    return this.userService.getUserInfor().subscribe(data => {
      this.infor = data
      if(this.infor.role === 'admin'){
        this.isAdmin = true
      }
    });
  }

  onSelect(productId: string): void { // Sửa productId thành kiểu string
    const selectedProduct = this.productService.getProductById(productId);
    if (selectedProduct) {
      this.productService.setSelectedProduct(selectedProduct); // Đặt sản phẩm được chọn
      this.searchTerm = ""
      this.showDropdown = false
    } else {
      console.error(`Product with ID ${productId} not found`);
    }
  }

 // Lắng nghe sự kiện click ở bất kỳ đâu trên trang
 @HostListener('document:click', ['$event'])
 clickOutside(event: Event) {
   // Kiểm tra xem nơi nhấp chuột có nằm ngoài component không
   if (!this.eRef.nativeElement.contains(event.target)) {
     this.showDropdown = false;  // Đóng dropdown khi nhấp bên ngoài
   }
 }

 @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset;
    const stickyPoint = 150;  // Tùy chỉnh vị trí cuộn để top bar ẩn

    if (offset >= stickyPoint) {
      this.isSticky = true;  // Khi cuộn qua stickyPoint
    } else {
      this.isSticky = false;  // Khi trở lại phần đầu trang
    }
  }

 // Hàm để mở dropdown khi nhấp vào nút hoặc input
 toggleDropdown() {
   this.showDropdown = !this.showDropdown;
 }
}
