import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductApiService } from '../../services/product-api.service';

interface Order {
  id: string;
  status: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
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
  orderId: string = '';
  orderStatus: string = 'pending';
  orders: Order[] = [];

  constructor(private fb: FormBuilder, private productService: ProductApiService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      description: ['', Validators.required],
      image: [[]],
      variants: this.fb.array([this.createVariant()])
    });
  }

  ngOnInit(): void {
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

  removeVariant(index: number) {
    this.variants.removeAt(index);
  }

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
        this.resetForm();
      },
      error => {
        console.error('Error creating product:', error);
      }
    );
  }

  updateProduct(): void {
    if (this.productForm.valid && this.editingProductId) {
      const formData = new FormData();
      const productData = this.productForm.value;
  
      // Append basic product information
      formData.append('name', productData.name);
      formData.append('price', productData.price.toString());
      formData.append('quantity', productData.quantity.toString());
      formData.append('description', productData.description);
  
      // Append variants as a JSON string
      formData.append('variants', JSON.stringify(productData.variants));
  
      // Append new images
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file, index) => {
          formData.append(`newImages`, file, file.name);
        });
      }
  
      // Append existing image URLs that should be kept
      if (this.selectedProduct && this.selectedProduct.image) {
        this.selectedProduct.image.forEach((imageUrl, index) => {
          if (!this.imagesToDelete || !this.imagesToDelete.includes(imageUrl)) {
            formData.append(`existingImages`, imageUrl);
          }
        });
      }
  
      this.productService.updateProduct(this.editingProductId, formData).subscribe(
        (updatedProduct: Product) => {
          const index = this.products.findIndex(p => p._id === this.editingProductId);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.stopEdit();
          // Optionally, show a success message
          console.log('Product updated successfully');
        },
        error => {
          console.error('Error updating product:', error);
          // Optionally, show an error message to the user
        }
      );
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
        this.products = this.products.filter(p => p._id !== id);
      },
      error => {
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

  onSubmitOrder(): void {
    const order = this.orders.find(o => o.id === this.orderId);
    if (order) {
      order.status = this.orderStatus;
    } else {
      this.orders.push({ id: this.orderId, status: this.orderStatus });
    }

    this.orderId = '';
    this.orderStatus = 'pending';
  }

  editOrder(order: Order): void {
    this.orderId = order.id;
    this.orderStatus = order.status;
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