import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdService {
  // Sử dụng BehaviorSubject để quản lý và theo dõi giá trị của isAdAvailable
  private isAdAvailableSubject = new BehaviorSubject<boolean>(false);
  isAdAvailable$ = this.isAdAvailableSubject.asObservable();

  // Hàm để cập nhật trạng thái của isAdAvailable
  setAdAvailability(isAvailable: boolean) {
    this.isAdAvailableSubject.next(isAvailable);
  }
}
