import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoading = false;
  showHeaderFooter = true;

  constructor(private router: Router,private languageService: LanguageService) {
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
        this.showHeaderFooter = false;
      } else {
        this.showHeaderFooter = true;
      }
    });
     // Nếu bạn cần làm gì đó khi ngôn ngữ thay đổi trong AppComponent
     this.languageService.currentLanguage.subscribe(lang => {
      // Có thể thực hiện các tác vụ liên quan đến ngôn ngữ ở đây nếu cần
    });
  }
  title = 'nintshop';
}
