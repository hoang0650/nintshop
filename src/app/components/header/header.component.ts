import {  ChangeDetectorRef,Component, OnInit, HostListener } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0; // Biến để lưu số lượng sản phẩm trong giỏ hàng
  currentLanguage: string;
  isLoggedIn: boolean = false
  infor: any;
  searchTerm: string = '';
  showDropdown: boolean = false;
  products = [{ name: 'Sản phẩm 1' }, { name: 'Sản phẩm 2' }, { name: 'Sản phẩm 3' }];
  filter: string = '';
  searchResults?: any
  listProducts: any[] = []; // Your list of products here
  filteredProducts: any;
  showResults: boolean = false;
  constructor(private cdRef:ChangeDetectorRef, public productService: ProductService, private cartService: CartService, private languageService: LanguageService, private translate: TranslateService, private userService: UserService) {
    this.currentLanguage = 'vi'; // Ngôn ngữ mặc định
    this.translate.setDefaultLang(this.currentLanguage);
    this.userInfor()
    this.listProducts = [
      { id: 1, name: 'Product 1', description: 'Description 1' },
      { id: 2, name: 'Product 2', description: 'Description 2' },
      // Add more products as needed
    ];

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
      console.log('status', status);
      this.isLoggedIn = status
      this.userInfor()
    })
  }

  selectLanguage(language: string): void {
    this.languageService.changeLanguage(language); // Gọi hàm để thay đổi ngôn ngữ
  }

  searchIconClick() {
    this.showDropdown = false;
    this.filter = '';
    this.searchResults = [];
    this.cdRef.detectChanges()
  }

  logOut() {
    localStorage.removeItem('access_token')
    this.userService.logout()
    this.isLoggedIn = false

  }

  userInfor() {
    return this.userService.getUserInfor().subscribe(data => {
      this.infor = data
      console.log('data', data);

    });
  }

  onSelect(product: number): void {
    // this.productService.setSelectedProduct(product)
    const selectedProduct = this.productService.getProductById(product)
  }

  onInputChange() {
    // Hiển thị kết quả khi có chữ nhập vào
    this.cdRef.detectChanges()

  }
  // Hàm xử lý blur
  onBlur() {
    // Đóng dropdown sau khi rời khỏi ô input
    setTimeout(() => {
      this.showDropdown = false;
    }, 100);
  }
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.showDropdown = false; // Đóng dropdown nếu nhấp ra ngoài
    }
  }
}
