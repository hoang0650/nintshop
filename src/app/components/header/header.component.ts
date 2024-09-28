import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../interfaces/user.model';
import { UserService } from '../../services/user.service';
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
  constructor(private cartService: CartService, private languageService: LanguageService, private translate: TranslateService,private userService: UserService) {
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
    this.userService.isLoggedIn.subscribe((status)=>{
      console.log('status',status);
      this.isLoggedIn = status
      this.userInfor()
    })
  }

  selectLanguage(language: string): void {
    this.languageService.changeLanguage(language); // Gọi hàm để thay đổi ngôn ngữ
  }

  logOut(){
    localStorage.removeItem('access_token')
    this.userService.logout()
    this.isLoggedIn = false

  }

  userInfor(){
    return this.userService.getUserInfor().subscribe(data=>{
      this.infor=data
      console.log('data',data);
      
    });
  }
}
