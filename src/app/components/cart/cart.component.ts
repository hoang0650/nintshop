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
  user: any; // Khởi tạo userId
  discount: number = 0; // Lưu số tiền giảm giá từ voucher
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
        this.user = userInfo; // Lưu userId từ thông tin người dùng        
        this.isLoggedIn = true;
      },
      error: () => {
        this.toastr.error('Error fetching user information.');
      }
    });
  }

  // Tăng số lượng sản phẩm
  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item.name, item.quantity + 1);
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.name, item.quantity - 1);
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeItem(name: string) {
    this.cartService.removeFromCart(name);
  }

  // Áp dụng mã voucher và tính số tiền giảm giá
  applyVoucher() {
    if (!this.isLoggedIn) {
      this.voucherError = 'Vui lòng đăng nhập để nhập mã voucher.';
      return;
    }

    if(this.user.usedVouchers.length > 0 && (this.user.usedVouchers[length] ==='DISCOUNT10' || this.user.usedVouchers[length] ==='SUMMER20')){
      this.voucherError = 'Mã vouvher của bạn đã được sử dụng.';
      return;
    }
    // Giả định bạn đã có sẵn các mã voucher và giá trị tương ứng
    const availableVouchers: { [code: string]: number } = {
      'DISCOUNT10': 10,  // Giảm 10 đơn vị
      'SUMMER20': 20,      // Giảm 20 đơn vị
    };

    // Kiểm tra mã voucher có hợp lệ không
    if (this.voucherCode in availableVouchers) {
      const discountAmount = availableVouchers[this.voucherCode]; // Lấy giá trị giảm giá từ mã voucher
      this.cartService.applyVoucher(this.voucherCode, discountAmount); // Áp dụng giảm giá vào CartService
      this.discount = discountAmount; // Cập nhật giảm giá trong component
      this.voucherError = null; // Reset lỗi nếu có
      this.toastr.success(`Voucher applied successfully! Discount: ${discountAmount}`);
    } else {
      this.voucherError = 'Mã voucher không hợp lệ. Vui lòng thử lại.';
      this.toastr.error(this.voucherError);
    }
  }

  // Tính tổng giá trị giỏ hàng sau khi áp dụng giảm giá


  getTotalPrice(): number{
    return this.cartService.getTotalPrice() - this.discount;
  }

  // Chuyển sang trang thanh toán
  proceedToCheckout() {
    const cartItemsString = JSON.stringify(this.cartItems); // Chuyển giỏ hàng thành chuỗi JSON
    const discount = this.cartService.getCurrentDiscount()
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
