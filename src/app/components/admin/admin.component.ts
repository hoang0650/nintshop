import { Component , OnInit} from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: string;
  status: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  // Product variables
  productName: string = '';
  productPrice: number = 0;
  products: Product[] = [];
  isEditing: boolean = false;
  editingProductId: number | null = null;

  // Order variables
  orderId: string = '';
  orderStatus: string = 'pending';
  orders: Order[] = [];
  editingOrder: Order | null = null;

  constructor() { }

  ngOnInit(): void {
    // Initialize with some dummy data or fetch from a service
    this.products = [
      { id: 1, name: 'Product A', price: 100000 },
      { id: 2, name: 'Product B', price: 200000 },
      { id: 3, name: 'Product C', price: 300000 }
    ];

    this.orders = [
      { id: 'ORD123', status: 'pending' },
      { id: 'ORD124', status: 'shipped' },
      { id: 'ORD125', status: 'delivered' },
      { id: 'ORD126', status: 'cancelled' }
    ];
  }

  // Product Methods
  onSubmitProduct(): void {
    if (this.isEditing && this.editingProductId !== null) {
      // Update existing product
      const index = this.products.findIndex(p => p.id === this.editingProductId);
      if (index !== -1) {
        this.products[index].name = this.productName;
        this.products[index].price = this.productPrice;
      }
      this.isEditing = false;
      this.editingProductId = null;
    } else {
      // Add new product
      if (this.productName && this.productPrice) {
        const newProduct: Product = {
          id: this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1,
          name: this.productName,
          price: this.productPrice
        };
        this.products.push(newProduct);
      }
    }

    // Reset form
    this.productName = '';
    this.productPrice = 0;
  }

  editProduct(product: Product): void {
    this.isEditing = true;
    this.editingProductId = product.id;
    this.productName = product.name;
    this.productPrice = product.price;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingProductId = null;
    this.productName = '';
    this.productPrice = 0;
  }

  removeProduct(product: Product): void {
    this.products = this.products.filter(p => p.id !== product.id);
    // If the product being edited is removed, cancel editing
    if (this.editingProductId === product.id) {
      this.cancelEdit();
    }
  }

  // Order Methods
  onSubmitOrder(): void {
    const order = this.orders.find(o => o.id === this.orderId);
    if (order) {
      order.status = this.orderStatus;
    } else {
      // Optionally, handle case when order ID not found
      // For simplicity, adding new order if not exists
      this.orders.push({ id: this.orderId, status: this.orderStatus });
    }

    // Reset form
    this.orderId = '';
    this.orderStatus = 'pending';
  }

  editOrder(order: Order): void {
    this.orderId = order.id;
    this.orderStatus = order.status;
  }

}
