import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductApiService } from '../../services/product-api.service';
import { CheckoutService } from '../../services/checkout.service';
import { MessageService } from '../../services/message.service';
// Define the enum for order status
enum OrderStatus {
  Pending = 'pending',
  Completed = 'completed',
  Delivered = 'delivered',
  Cancelled = 'cancelled'
}

interface Order {
  _id: string;
  orderId: string;
  fullName: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  imageSrc: string | ArrayBuffer | null = null;
  imageId: string | null = null;
  uploadMessage: string = '';
  fetchMessage: string = '';
  inputImageId: string = '';
 
  // Product variables
  products: Product[] = [];
  productForm: FormGroup;
  selectedProduct: Product | null = null;
  isEditing: boolean = false;
  editingProductId: string | null = null;
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  expandedProductId: string | null = null;
  imagesToDelete: string[] = [];

  // Order variables
  orders: Order[] = [];
  orderForm: FormGroup;
  OrderStatus = OrderStatus; // Make enum available in the template

  constructor(private messageService: MessageService,private fb: FormBuilder, private productService: ProductApiService, private checkoutService: CheckoutService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      description: ['', Validators.required],
      image: this.fb.array([]),
      variants: this.fb.array([this.createVariant()])
    });
    this.orderForm = this.fb.group({
      _id: ['', Validators.required],
      orderId: ['', Validators.required],
      status: [OrderStatus.Pending, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
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

  removeVariant(index: number) {
    this.variants.removeAt(index);
  }

  onFilesSelected(event: any) {
    const input = event.target as HTMLInputElement;
    const file: File = event.target.files[0];
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      
      // Call the upload service to upload the selected files
      this.productService.uploadImages(file)
        .subscribe(
          response => {
            this.imageId = response.imageId;
            console.log('Files uploaded successfully:', response);
          },
          error => {
            console.error('Error uploading files:', error);
          }
        );
    }
  }

  getImageById() {
    if (this.imageId) {
      this.productService.getImage(this.imageId).subscribe(
        (blob: Blob) => {
          const reader = new FileReader();
          reader.onload = (e: any) => this.imageSrc = e.target.result;
          reader.readAsDataURL(blob);
          this.fetchMessage = 'Image fetched successfully!';
        },
        error => {
          console.error('Error fetching image', error);
          this.fetchMessage = 'Error fetching image. Please try again.';
        }
      );
    }
  }

  startEdit(id: string): void {
    this.editingProductId = id;
    const productToEdit = this.products.find(p => p._id === id);
    if (productToEdit) {
      this.selectedProduct = { ...productToEdit };
      this.productForm.patchValue(productToEdit);
      
      // Clear existing variants
      while (this.variants.length !== 0) {
        this.variants.removeAt(0);
      }
      
      // Add variants from the product
      productToEdit.variants.forEach(variant => {
        this.variants.push(this.fb.group({
          size: [variant.size],
          color: [variant.color],
          stock: [variant.stock]
        }));
      });
      
      this.isEditing = true;
    }
  }

  stopEdit(): void {
    this.editingProductId = null;
    this.selectedProduct = null;
    this.productForm.reset();
    this.isEditing = false;
    
    // Reset variants
    while (this.variants.length !== 0) {
      this.variants.removeAt(0);
    }
    this.variants.push(this.createVariant());
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.editingProductId) {
        this.updateProduct();
      } else {
        this.createProduct();
      }
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  createProduct(): void {
    const productData = this.prepareProductData();
    this.productService.createProduct(productData).subscribe(
      (newProduct: Product) => {
        this.products.push(newProduct);
        this.messageService.addMessage('success', 'This is a success message!');
        this.resetForm();
      },
      error => {
        this.messageService.addMessage('danger', 'This is an error message!');
        console.error('Error creating product:', error);
      }
    );
  }

  updateProduct(): void {
    if (this.selectedProduct && this.productForm.valid) {
      this.productService.updateProduct(this.selectedProduct._id!, this.productForm.value).subscribe(
        () => {
          this.messageService.addMessage('success', 'This is a success message!');
          this.loadProducts(); // Reload rooms to get the updated data
          this.stopEdit();  // Stop editing and reset the form
        },
        error => console.error('Error updating room:', error)
      );
    } else {
      this.messageService.addMessage('danger', 'This is an error message!');
      console.error('Form is invalid or no room selected');
    }
  }

  markImageForDeletion(imageUrl: string): void {
    if (!this.imagesToDelete) {
      this.imagesToDelete = [];
    }
    this.imagesToDelete.push(imageUrl);
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.messageService.addMessage('success', 'This is a success message!');
        this.products = this.products.filter(p => p._id !== id);
      },
      error => {
        this.messageService.addMessage('danger', 'This is an error message!');
        console.error('Error deleting product:', error);
      }
    );
  }

  resetForm(): void {
    this.productForm.reset();
    this.selectedProduct = null;
    this.isEditing = false;
    this.editingProductId = null;
    this.imagePreviews = [];
    this.selectedFiles = [];
    
    // Reset variants
    while (this.variants.length !== 0) {
      this.variants.removeAt(0);
    }
    this.variants.push(this.createVariant());
  }

  loadOrders() {
    this.checkoutService.getOrders().subscribe(
      data => {
        console.log('data',data);
        
        this.orders = data
      }
    )
  }

  onSubmitOrder() {
    if (this.orderForm.valid) {
      const { _id, status } = this.orderForm.value;
      this.checkoutService.updateOrderStatus(_id, status).subscribe(
        (updatedOrder: Order) => {
          const index = this.orders.findIndex(order => order._id === updatedOrder._id);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          this.messageService.addMessage('success', 'This is a success message!');
          this.orderForm.reset({ status: OrderStatus.Pending });
          console.log('Order status updated successfully');
        },
        (error) => {
          this.messageService.addMessage('danger', 'This is an error message!');
          console.error('Error updating order status:', error);
        }
      );
    }
  }

  editOrder(order: Order) {
    this.orderForm.patchValue({
      _id: order._id,
      orderId: order.orderId,
      status: order.status
    });
  }

  getStatusValues(): string[] {
    return Object.values(OrderStatus);
  }

  onExpandChange(productId: string): void {
    if (this.expandedProductId === productId) {
      this.expandedProductId = null;
    } else {
      this.expandedProductId = productId;
    }
  }

  private prepareProductData(): any {
    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('quantity', this.productForm.get('quantity')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('variants', JSON.stringify(this.productForm.get('variants')?.value));
    
    this.selectedFiles.forEach((file, index) => {
      formData.append(`image`, file, file.name);
    });

    return formData;
  }
}