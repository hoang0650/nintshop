import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'; // Import Subscription
interface Subcategory {
  id: number;
  name: string;
  description: string;
}
interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeCategory: Category | null = null;
  cartItemCount: number = 0; // Biến để lưu số lượng sản phẩm trong giỏ hàng
  currentLanguage: string;
  products: any
  isLoggedIn: boolean = false
  isAdmin: boolean = false;
  isSticky: boolean = false;
  isLeftSidebarOpen: boolean = false;
  isRightSidebarOpen: boolean = false;
  infor: any;
  searchTerm: string = '';
  filteredProducts: any
  public showDropdown = false;  // Biến để hiển thị hoặc ẩn dropdown
  private subscriptions: Subscription = new Subscription(); // Subscription gốc để quản lý tất cả
  constructor(private router: Router,private eRef: ElementRef,public productService: ProductService, private cartService: CartService, private languageService: LanguageService, private translate: TranslateService, private userService: UserService) {
    this.currentLanguage = 'vi'; // Ngôn ngữ mặc định
    this.translate.setDefaultLang(this.currentLanguage);
    this.userInfor()

  }

  ngOnInit(): void {
    this.isMobile();
    
    // Thêm subscription lắng nghe thay đổi ngôn ngữ
    this.subscriptions.add(
      this.languageService.currentLanguage.subscribe((lang) => {
        this.currentLanguage = lang;
        this.translate.use(lang); // Cập nhật ngôn ngữ cho dịch vụ dịch
      })
    );

    // Thêm subscription cho giỏ hàng
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe(() => {
        this.cartItemCount = this.cartService.getTotalItemCount();
      })
    );

    // Thêm subscription cho thông tin đăng nhập
    this.subscriptions.add(
      this.userService.getUserInfor().subscribe((data) => {
        if (data && data.username) {
          this.infor = data;
          if (this.infor.role === 'admin') {
            this.isAdmin = true;
          }
        } else {
          console.error('No username found in user data');
        }
      })
    );

    // Thêm subscription cho danh sách sản phẩm
    this.subscriptions.add(
      this.productService.products$.subscribe((products) => {
        this.products = products;
        this.filteredProducts = [...this.products]; // Sao chép danh sách ban đầu
      })
    );
  }

  ngOnDestroy(): void {
    // Hủy tất cả các subscriptions khi component bị hủy
    this.subscriptions.unsubscribe();
  }

  categories: Category[] = [
    {
      id: 1,
      name: 'KEYCHAIN',
      subcategories: [
        { id: 101, name: 'Móc khóa Pokemon', description: 'keychain' },
        { id: 102, name: 'Móc Khóa Capibara',description: 'keychain'}
      ]
    },
    {
      id: 2,
      name: 'STICKER',
      subcategories: [
        { id: 201, name: 'Hình dán Capybara', description :'sticker'},
      ]
    },
    {
      id: 3,
      name: 'REAL_ESTATE',
      subcategories: [
        { id: 301, name: 'Căn hộ', description:'Bất Động Sản' },
        { id: 302, name: 'Nhà phố', description:'Bất Động Sản' }
      ]
    },
  ];

  // Show subcategories on hover
  onCategoryHover(category: Category): void {
    this.activeCategory = category;
  }

  // Hide subcategories when mouse leaves
  onCategoryLeave(): void {
    this.activeCategory = null;
  }

  onCategoryClick(category: any) {
    // Nếu category đã được chọn, click sẽ bỏ chọn
    if (this.activeCategory === category) {
      this.activeCategory = null;
    } else {
      // Chọn category và mở subcategories
      this.activeCategory = category;
    }
  }

  onSubcategoryClick(subcategory: any) {
    console.log('Selected subcategory:', subcategory);
    // Xử lý khi click vào subcategory
  }

  onCategorySelect(category: any) {
    // Chuyển hướng tới ShopComponent với type là category đã chọn
    this.router.navigate(['/shop'], { queryParams: { type: category.description } });
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

  isMobile(): boolean {
    return window.matchMedia('(max-width: 557px)').matches;
  }

  toggleLeftSidebar(){
    this.isLeftSidebarOpen = !this.isLeftSidebarOpen
  }

  toggleRightSidebar(){
    this.isRightSidebarOpen = !this.isRightSidebarOpen
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
