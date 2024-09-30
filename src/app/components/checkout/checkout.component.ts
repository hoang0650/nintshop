import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  billingInfo = {
    fullName: '',
    email: '',
    address: '',
    phone: ''
  };

  constructor(
    private checkoutService: CheckoutService,
    private activetedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe(params => {
      const cartItemsString = params['cartItems'];
      this.cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
      this.totalPrice = params['totalPrice'] ? parseFloat(params['totalPrice']) : 0;
    });
  }

  placeOrder() {
    const orderData = {
      ...this.billingInfo,
      totalPrice: this.totalPrice,
      orderId: this.generateOrderId(),
    };

    this.checkoutService.placeOrder(orderData).subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        this.cartService.clearCart();

        // Chuyển totalPrice và orderId qua router
        this.router.navigate(['/qr-payment'], { queryParams: { 
          totalPrice: orderData.totalPrice,
          orderId: orderData.orderId
        } });
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
