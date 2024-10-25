import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  voucherCode: string = '';
  voucherError: string | null = null;
  user: any;
  discount: number = 0;
  cartItems: CartItem[] = [];
  hasVariants: boolean = false;
  totalPrice: number = 0;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router, 
    public cartService: CartService, 
    private userService: UserService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.getTotalPrice();
      this.checkForVariants(); // Kiểm tra lại khi giỏ hàng thay đổi
    });

    this.userService.getUserInfor().subscribe({
      next: (userInfo) => {
        this.user = userInfo;
        this.isLoggedIn = true;
      },
      error: () => {
        this.toastr.error('Error fetching user information.');
      }
    });
  }

  checkForVariants() {
    this.hasVariants = this.cartItems.some(item => item.variants?.size || item.variants?.color);
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.name, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.name, item.quantity - 1);
    }
  }

  removeItem(name: string) {
    this.messageService.addMessage('success', 'Bạn đã xóa sản phẩm thành công!');
    this.cartService.removeFromCart(name);
  }

  applyVoucher() {
    if (!this.isLoggedIn) {
      this.voucherError = 'Vui lòng đăng nhập để nhập mã voucher.';
      return;
    }

    if (this.user.usedVouchers.includes(this.voucherCode)) {
      this.voucherError = 'Mã voucher của bạn đã được sử dụng.';
      return;
    }

    const availableVouchers: { [code: string]: number } = {
      'DISCOUNT10': 10,
      'SUMMER20': 20,
    };

    if (this.voucherCode in availableVouchers) {
      const discountAmount = availableVouchers[this.voucherCode];
      this.cartService.applyVoucher(this.voucherCode, discountAmount);
      this.discount = discountAmount;
      this.voucherError = null;
      this.toastr.success(`Voucher applied successfully! Discount: ${discountAmount}`);
    } else {
      this.voucherError = 'Mã voucher không hợp lệ. Vui lòng thử lại.';
      this.toastr.error(this.voucherError);
    }
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice() - this.discount;
  }

  proceedToCheckout() {
    const cartItemsString = JSON.stringify(this.cartItems);
    const discount = this.cartService.getCurrentDiscount();
    const subtotal = this.cartService.getTotalPrice();
    this.router.navigate(['/checkout'], {
      queryParams: {
        user: this.user,
        voucherCode: this.voucherCode,
        cartItems: cartItemsString,
        subtotal: subtotal,
        discount: discount,
        totalPrice: subtotal - discount
      }
    });
  }
}
