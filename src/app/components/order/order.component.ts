import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  order = {
    itemName: '',
    itemDescription: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    paymentAmount: 0
  };
  
  orderConfirmation: string = '';
  orderError: string = '';

  submitOrder() {
    // Giả sử bạn có một dịch vụ gửi đơn đặt hàng đến server
    // Ví dụ:
    if (this.order.paymentAmount > 0) {
      // Gọi dịch vụ gửi đơn đặt hàng
      this.orderConfirmation = 'Đơn hàng của bạn đã được đặt thành công!';
      this.orderError = '';
      // Reset đơn hàng sau khi đặt
      this.resetOrder();
    } else {
      this.orderError = 'Số tiền thanh toán không hợp lệ!';
      this.orderConfirmation = '';
    }
  }

  resetOrder() {
    this.order = {
      itemName: '',
      itemDescription: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      paymentAmount: 0
    };
  }
}
