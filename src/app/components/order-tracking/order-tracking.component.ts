import { Component } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  orderId: string = '';
  orderDetails: any; // Có thể là kiểu dữ liệu bạn muốn
  errorMessage: string = '';

  constructor(private checkoutService:CheckoutService) {}

  trackOrder() {
    // Logic để gọi API và lấy thông tin đơn hàng
    if (this.orderId) {
      // Giả sử bạn có một dịch vụ để gọi API
      this.checkoutService.getOrder(this.orderId).subscribe(
        (response) => {
          this.orderDetails = response;
          this.errorMessage = '';
        },
        (error) => {
          this.orderDetails = null;
          this.errorMessage = 'Không tìm thấy đơn hàng với mã này.';
        }
      );
    } else {
      this.errorMessage = 'Vui lòng nhập mã đơn hàng.';
      this.orderDetails = null;
    }
  }
}
