import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Variant } from '../interfaces/variant';

export interface CartItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  variants?: {
    size: string;
    color: string;
  };
  hasInsurance?: boolean;  // Thêm thuộc tính mới
  insurancePrice?: number; // Thêm thuộc tính mới
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private voucherCode: string | null = null; // Mã voucher
  private discount: number = 0; // Số tiền giảm giá

  cartItems$ = this.cartItemsSubject.asObservable(); // Observable để theo dõi thay đổi của giỏ hàng

  constructor() {
    this.loadCartFromLocalStorage(); // Khôi phục giỏ hàng khi khởi tạo dịch vụ
  }

  // Lưu giỏ hàng vào localStorage
  private saveCartToLocalStorage() {
    const cartItems = this.getCartItems();
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Khôi phục giỏ hàng từ localStorage
  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      this.cartItemsSubject.next(cartItems);
    }
  }

  // Lấy danh sách sản phẩm trong giỏ hàng
  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(item: CartItem) {
    const currentItems = this.getCartItems();
    const existingItem = currentItems.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ, tăng số lượng
      existingItem.quantity += item.quantity;
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
      currentItems.push(item);
    }

    this.cartItemsSubject.next([...currentItems]); // Cập nhật lại giỏ hàng
    this.saveCartToLocalStorage(); // Lưu vào localStorage
  }

  // Cập nhật số lượng của một sản phẩm
  updateQuantity(name: string, quantity: number) {
    const currentItems = this.getCartItems();
    const itemToUpdate = currentItems.find(item => item.name === name);

    if (itemToUpdate && quantity > 0) {
      itemToUpdate.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]); // Cập nhật lại giỏ hàng
      this.saveCartToLocalStorage(); // Lưu vào localStorage
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(name: string) {
    const currentItems = this.getCartItems().filter(item => item.name !== name);
    this.cartItemsSubject.next([...currentItems]); // Cập nhật lại giỏ hàng
    this.saveCartToLocalStorage(); // Lưu vào localStorage
  }

  // Xóa toàn bộ giỏ hàng
  clearCart() {
    this.cartItemsSubject.next([]); // Xóa sản phẩm
    this.voucherCode = null; // Reset mã voucher
    this.discount = 0; // Reset giảm giá
    localStorage.removeItem('cart'); // Xóa giỏ hàng khỏi localStorage
  }

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  getTotalItemCount(): number {
    return this.getCartItems().reduce((count, item) => count + item.quantity, 0);
  }

  // Tính tổng giá tiền trong giỏ hàng
  getTotalPrice(): number {
    const subtotal = this.getCartItems().reduce((total, item) => total + item.price * item.quantity, 0);
    return subtotal; // Trả về tổng giá sau khi trừ giảm giá
  }

  // Áp dụng mã voucher và tính số tiền giảm giá
  applyVoucher(code: string, discountAmount: number) {
    this.voucherCode = code;
    this.discount = discountAmount; // Áp dụng giảm giá
  }

  // Lấy số tiền giảm giá hiện tại
  getCurrentDiscount(): number {
    return this.discount * this.getCartItems().reduce((total, item) => total + item.price * item.quantity, 0) / 100;
  }

  // Kiểm tra xem có áp dụng mã voucher không
  hasVoucher(): boolean {
    return this.voucherCode !== null;
  }
}
