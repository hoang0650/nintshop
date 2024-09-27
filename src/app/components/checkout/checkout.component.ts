import { Component, OnInit} from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private checkoutService: CheckoutService, private activetedRoute: ActivatedRoute,private router: Router,private cartService: CartService){}
  cartItems: any[] = [];
  totalPrice: number = 0;
  billingInfo = {
    fullName: '',
    email: '',
    address: '',
    phone: '',
  };

  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe(params => {
      const cartItemsString = params['cartItems'];
      this.cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
      this.totalPrice = params['totalPrice'] ? parseFloat(params['totalPrice']) : 0;
    });
  }

  placeOrder() {
    const orderDate = new Date();
    // const formattedDate = `${this.padZero(orderDate.getDate())}/${this.padZero(orderDate.getMonth() + 1)}/${orderDate.getFullYear()}`;
    const orderData = {
      ...this.billingInfo,
      items: this.cartItems,
      totalPrice: this.totalPrice,
      orderId: this.generateOrderId(),
      // createdAt: formattedDate
    };
    this.checkoutService.placeOrder(orderData).subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        alert('Thanh toán thành công!');
        // Xóa tất cả các mặt hàng trong giỏ hàng
        this.cartService.clearCart();
        // Điều hướng đến trang chủ
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error placing order', error);
      }
    );
  }

  generateOrderId(): string {
    return 'ORD' + Math.floor(Math.random() * 1000000).toString();
  }

}
