import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
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
  filteredProducts: any
  public showDropdown = false;  // Biến để hiển thị hoặc ẩn dropdown
  constructor(private eRef: ElementRef,public productService: ProductService, private cartService: CartService, private languageService: LanguageService, private translate: TranslateService, private userService: UserService) {
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
  }

  selectLanguage(language: string): void {
    this.languageService.changeLanguage(language); // Gọi hàm để thay đổi ngôn ngữ
  }

  onSearch(): void {
    of(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.productService.getProducts(query))
    ).subscribe(products => {
      this.filteredProducts = products;
    });
  }
  

  logOut() {
    localStorage.removeItem('access_token')
    this.userService.logout()
    this.isLoggedIn = false

  }

  userInfor() {
    return this.userService.getUserInfor().subscribe(data => {
      this.infor = data
    });
  }

  onSelect(product: number): void {
    // this.productService.setSelectedProduct(product)
    const selectedProduct = this.productService.getProductById(product)
    this.searchTerm =""
  }

 // Lắng nghe sự kiện click ở bất kỳ đâu trên trang
 @HostListener('document:click', ['$event'])
 clickOutside(event: Event) {
   // Kiểm tra xem nơi nhấp chuột có nằm ngoài component không
   if (!this.eRef.nativeElement.contains(event.target)) {
     this.showDropdown = false;  // Đóng dropdown khi nhấp bên ngoài
   }
 }

 // Hàm để mở dropdown khi nhấp vào nút hoặc input
 toggleDropdown() {
   this.showDropdown = !this.showDropdown;
 }
}
