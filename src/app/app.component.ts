import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { SeoService } from './services/seo.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoading = false;
  showHeader = true;
  showFooter = true;

  constructor(private router: Router,private languageService: LanguageService, private seoService: SeoService) {
    // Lắng nghe sự kiện router để kiểm soát trạng thái loading
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true; // Bắt đầu loading khi chuyển trang
      } else if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      ) {
        this.isLoading = false; // Kết thúc loading khi hoàn tất
      }

      // Kiểm tra nếu route hiện tại là Livestream để ẩn header/footer
      if (this.router.url.includes('/livestream')) {
        this.showHeader = false;
        this.showFooter = false;
      }if (this.router.url.includes('/virtual-office')) {
        this.showFooter = false;
      } else {
        this.showHeader = true;
        this.showFooter = true;
      }
    });
     // Nếu bạn cần làm gì đó khi ngôn ngữ thay đổi trong AppComponent
     this.languageService.currentLanguage.subscribe(lang => {
      // Có thể thực hiện các tác vụ liên quan đến ngôn ngữ ở đây nếu cần
    });
    // Thiết lập các thẻ mặc định
    this.seoService.setSocialShareTags({
      title: 'Nintshop | trang mua sắm, thương mại và đăng tin hàng đầu.',
      description: 'Trang đăng tin bất động sản, mua sắm, thương mại hàng đầu tại nintshop.com',
      image: 'https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0',
      url: 'www.nintshop.com',
    });
  }

   // Function to scroll to the top of the page with smooth scroll effect
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle role clicks, preventing scroll for admin
  onRoleClick(role: string) {
    if (role === 'admin') {
      console.log('Admin role clicked, prevent scrolling');
      return; // Do nothing to prevent scroll for admin role
    }
    // Other role clicks can trigger some other actions if necessary
  }

}
