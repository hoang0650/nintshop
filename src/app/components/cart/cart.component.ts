import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
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

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  proceedToCheckout() {
    const cartItemsString = JSON.stringify(this.cartItems);  // Chuyển đối tượng thành chuỗi JSON
    const totalPrice = this.getTotalPrice();

    this.router.navigate(['/checkout'], {
      queryParams: {
        cartItems: cartItemsString,
        totalPrice: totalPrice
      }
    });
  }
}
