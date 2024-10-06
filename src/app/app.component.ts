import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/language.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  showHeaderFooter = true;
  constructor(private router: Router, private languageService: LanguageService){}
  ngOnInit() {
    // Lắng nghe sự thay đổi của route
    this.router.events.subscribe(() => {
      // Kiểm tra nếu route hiện tại là Livestream
      if (this.router.url.includes('/livestream')) {
        this.showHeaderFooter = false; // Ẩn header và footer
      } else {
        this.showHeaderFooter = true;  // Hiển thị header và footer
      }
    });
    // Nếu bạn cần làm gì đó khi ngôn ngữ thay đổi trong AppComponent
    this.languageService.currentLanguage.subscribe(lang => {
      // Có thể thực hiện các tác vụ liên quan đến ngôn ngữ ở đây nếu cần
    });
  }
  title = 'nintshop';
}
