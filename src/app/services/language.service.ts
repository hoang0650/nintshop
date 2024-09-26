import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Sử dụng BehaviorSubject để quản lý trạng thái ngôn ngữ
  private languageSource = new BehaviorSubject<string>('en');
  currentLanguage = this.languageSource.asObservable();

  constructor() {}

  // Hàm để thay đổi ngôn ngữ
  changeLanguage(lang: string) {
    this.languageSource.next(lang);
  }
}
