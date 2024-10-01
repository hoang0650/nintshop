import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr'; // Thêm thư viện thông báo nếu cần

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  voucherCode: string = '';
  voucherError: string | null = null; // Để hiển thị lỗi voucher nếu có
  userId: string = ''; // Khởi tạo userId
  discount: number = 0; // Biến này có thể dùng để lưu thông tin giảm giá
  cartItems: any[] = []; // Khởi tạo giỏ hàng là một mảng rỗng
  totalPrice: number = 0; // Tổng tiền trước khi giảm giá
  isLoggedIn: boolean = false;

  constructor(
    private router: Router, 
    public cartService: CartService, 
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Lấy giỏ hàng từ CartService
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.getTotalPrice(); // Cập nhật tổng tiền mỗi khi giỏ hàng thay đổi
    });

    // Gọi phương thức getUserInfo để lấy thông tin người dùng khi khởi tạo component
    this.userService.getUserInfor().subscribe({
      next: (userInfo) => {
        this.userId = userInfo.userId; // Lưu userId từ thông tin người dùng
        this.isLoggedIn = true
      },
      error: (error) => {
        this.toastr.error('Error fetching user information.');
      }
    });
  }

  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item.name, item.quantity + 1);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.name, item.quantity - 1);
    }
  }

  removeItem(name: string) {
    this.cartService.removeFromCart(name);
  }

  applyVoucher() {
    if (!this.isLoggedIn) {
      this.voucherError = 'Vui lòng đăng nhập để nhập mã voucher.';
      return;
    }
    // Giả sử bạn có cách để tính toán discountAmount
    const discountAmount = this.calculateDiscount(); // Hàm này có thể trả về số tiền giảm giá dựa trên voucher
    if (this.voucherCode) {
      this.cartService.applyVoucher(this.voucherCode, discountAmount);
      this.voucherError = null; // Reset lỗi
    } else {
      this.voucherError = 'Vui lòng nhập mã voucher hợp lệ.';
    }
  }

  calculateDiscount(): number {
    const totalPrice = this.cartService.getTotalPrice(); // Lấy tổng giá trị giỏ hàng
    const discountPercentage = 10; // Tỷ lệ giảm giá
    const discountAmount = (totalPrice * discountPercentage) / 100; // Tính số tiền giảm giá

    return discountAmount; // Trả về số tiền giảm giá
}


  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) - this.discount;
  }

  proceedToCheckout() {
    const cartItemsString = JSON.stringify(this.cartItems); // Chuyển đối tượng thành chuỗi JSON
    const totalPrice = this.getTotalPrice();

    this.router.navigate(['/checkout'], {
      queryParams: {
        cartItems: cartItemsString,
        totalPrice: totalPrice
      }
    });
  }
}
