import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { MessageService } from '../../services/message.service';
import { SeoService } from '../../services/seo.service';
@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  orderId: string = '';
  orderDetails: any; // Có thể là kiểu dữ liệu bạn muốn
  errorMessage: string = '';

  constructor(private checkoutService:CheckoutService, private messageService: MessageService, private seoService: SeoService) {}
  ngOnInit(){
    this.seoService.setSocialShareTags({
      title: 'Nintshop | trang mua sắm, thương mại và đăng tin hàng đầu',
      description: 'Trang đăng tin bất động sản, mua sắm, thương mại hàng đầu tại nintshop.com.',
      image: '',
      url: 'www.nintshop.com',
    });
  }
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
