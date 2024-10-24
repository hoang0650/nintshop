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
    this.seoService.updateTitle('Nintshop | trang mua sắm, thương mại và đăng tin hàng đầu');
          this.seoService.updateMetaTags([
            { name: 'description', content: 'Trang đăng tin bất động sản, mua sắm, thương mại hàng đầu tại nintshop.com.' },
            { name: 'keywords', content: 'đăng tin bất động sản, đăng tin bđs, mua sắm, thương mại hàng đầu, tin tức 24h, tin tuc 24h, nintshop, nintshop.com, tin tuc trong ngay, dang tin bat dong san, dang tin bds, mua sam, thuong mai hang dau, đọc truyện, bóng đá, thời trang, cười, tin tức trong ngày,  tintuc, doc truyen, 24h, tin nhanh , the thao, tin nhanh, thoi trang, thời sự, bong da, bao cong an, bao an ninh, thoi su, giai tri, giải trí, bao' }
    ]);
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
