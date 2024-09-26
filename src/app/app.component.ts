import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/language.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private languageService: LanguageService){}
  ngOnInit() {
    // Nếu bạn cần làm gì đó khi ngôn ngữ thay đổi trong AppComponent
    this.languageService.currentLanguage.subscribe(lang => {
      // Có thể thực hiện các tác vụ liên quan đến ngôn ngữ ở đây nếu cần
    });
  }
  title = 'nintshop';
}
