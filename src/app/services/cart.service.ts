import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: CartItem) {
    const currentItems = this.getCartItems();
    const existingItem = currentItems.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ, tăng số lượng
      existingItem.quantity += item.quantity;
    } else {
      // Nếu chưa có, thêm sản phẩm mới
      currentItems.push(item);
    }

    this.cartItemsSubject.next(currentItems);
  }

  updateQuantity(name: string, quantity: number) {
    const currentItems = this.getCartItems();
    const itemToUpdate = currentItems.find(item => item.name === name);
    if (itemToUpdate && quantity > 0) {
      itemToUpdate.quantity = quantity;
      this.cartItemsSubject.next(currentItems);
    }
  }

  removeFromCart(name: string) {
    const currentItems = this.getCartItems().filter(item => item.name !== name);
    this.cartItemsSubject.next(currentItems);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getTotalItemCount(): number {
    return this.getCartItems().reduce((count, item) => count + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.getCartItems().reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
