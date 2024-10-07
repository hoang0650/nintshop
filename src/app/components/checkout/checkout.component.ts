import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  voucherCode: string =""; // Lưu voucherCode
  user: any;
  cartItems: any[] = [];
  totalPrice: number = 0;
  subtotal: number = 0;
  discount: number = 0;
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
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe(params => {
      const cartItemsString = params['cartItems'];
      this.cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
      this.voucherCode = params['voucherCode']; // Nhận voucherCode
      console.log('voucherCode',this.voucherCode);
      
      this.subtotal = params['subtotal']? parseFloat(params['subtotal']): 0;
      this.discount = params['discount']? parseFloat(params['discount']): 0
      this.totalPrice = params['totalPrice'] ? parseFloat(params['totalPrice']) : 0;
    });
    this.userService.getUserInfor().subscribe((data:any)=>{
      this.user = data._id
    })
  }

  placeOrder() {
    const orderData = {
      ...this.billingInfo,
      items: this.cartItems,
      subtotal: this.subtotal,
      discount: this.discount,
      totalPrice: this.totalPrice,
      orderId: this.generateOrderId(),
    };
    this.checkoutService.placeOrder(orderData).subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        this.cartService.clearCart();
        this.userService.applyVoucher(this.user,this.voucherCode).subscribe((response) => {
          console.log('Apply Voucher successfully', response);
        },
        (error) => {
          console.error('Error Apply Voucher', error);
        });

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
