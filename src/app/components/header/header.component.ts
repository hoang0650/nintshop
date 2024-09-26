import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0; // Biến để lưu số lượng sản phẩm trong giỏ hàng
  currentLanguage: string;
  constructor(private cartService: CartService, private languageService: LanguageService, private translate: TranslateService) {
    this.currentLanguage = 'vi'; // Ngôn ngữ mặc định
    this.translate.setDefaultLang(this.currentLanguage);
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
  }

  selectLanguage(language: string): void {
    this.languageService.changeLanguage(language); // Gọi hàm để thay đổi ngôn ngữ
  }
}
