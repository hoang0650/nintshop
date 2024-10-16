import { Component,OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  currentLanguage: string;
  constructor(private languageService: LanguageService) {
    this.currentLanguage = 'en'; // Ngôn ngữ mặc định
  }
  ngOnInit(): void {
    this.languageService.currentLanguage.subscribe(lang => {
      this.currentLanguage = lang; // Cập nhật ngôn ngữ khi thay đổi
    });
  }
}
