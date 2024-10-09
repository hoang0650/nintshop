import { Component } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  orderId: string = '';
  orderDetails: any; // Có thể là kiểu dữ liệu bạn muốn
  errorMessage: string = '';

  constructor(private checkoutService:CheckoutService, private messageService: MessageService) {}

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
          this.messageService.addMessage('warning', 'Không tìm thấy đơn hàng với mã này!');
          this.orderDetails = null;
        }
      );
    } else {
      this.messageService.addMessage('danger', 'Vui lòng nhập mã đơn hàng!');
      this.orderDetails = null;
    }
  }
}
