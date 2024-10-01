import { Component , OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Product } from '../../interfaces/product';

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
  products: any[] = [];
  productForm: FormGroup;
  selectedProduct: any = null;
  isEditing: boolean = false;
  editingProductId: string | null = null;
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];

  // Order variables
  orderId: string = '';
  orderStatus: string = 'pending';
  orders: Order[] = [];
  editingOrder: Order | null = null;

  constructor( private productService: ProductService,
    private fb: FormBuilder) {
      // Khởi tạo form
      this.productForm = this.fb.group({
        name: [''],
        price: [0],
        quantity: [0],
        description: [''],
        variants: this.fb.array([this.createVariant()])
      });

  }

  ngOnInit(): void {
    // Initialize with some dummy data or fetch from a service
    this.loadProducts();

    this.orders = [
      { id: 'ORD123', status: 'pending' },
      { id: 'ORD124', status: 'shipped' },
      { id: 'ORD125', status: 'delivered' },
      { id: 'ORD126', status: 'cancelled' }
    ];
  }

  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  createVariant(): FormGroup {
    return this.fb.group({
      size: [''],
      color: [''],
      stock: [0]
    });
  }

  addVariant() {
    this.variants.push(this.createVariant());
  }

  // Xử lý khi người dùng chọn file
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      this.imagePreviews = [];
      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  startEdit(id: string): void {
    this.editingProductId = id;
    const productToEdit = this.products.find(r => r._id === id);
    if (productToEdit) {
      this.selectedProduct = { ...productToEdit };
      this.productForm.patchValue(productToEdit);
    }
  }

  stopEdit(): void {
    this.editingProductId = null;
    this.selectedProduct = null;
    this.productForm.reset();
  }

  onSubmit() {
    const product: Product = this.productForm.value;
    
    // Tạo form data để upload file
    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    // Thêm các thông tin khác vào formData
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('description', product.description);
    formData.append('variants', JSON.stringify(product.variants));

    // Gửi dữ liệu sản phẩm và hình ảnh đến server
    this.productService.addProduct(formData).subscribe(() => {
      console.log('Product added with images');
      // Làm gì đó sau khi thêm sản phẩm thành công
    });
    this.loadProducts();
  }


  loadProducts(): void {
    this.productService.products$.subscribe(data => {
      this.products = data;
    });
  }

  // Chọn sản phẩm để cập nhật
  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.productForm.patchValue(product);
  }

  // Cập nhật sản phẩm
  updateProduct(): void {
    if (this.productForm.valid && this.selectedProduct) {
      this.productService.updateProduct(this.productForm.value).subscribe(response => {
        if (response) {
          this.productService.loadUpdatedData();
          this.resetForm();
        } else {
          console.error('Failed to update product');
        }
      });
    }
  }

  // Xóa sản phẩm
  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(response => {
      if (response) {
        this.productService.loadUpdatedData();
      } else {
        console.error('Failed to delete product');
      }
    });
  }

  // Reset form
  resetForm(): void {
    this.productForm.reset();
    this.selectedProduct = null;
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
