import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
interface Category {
  name: string;
  img: string;
  length: number;
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  constructor(private router: Router, private productService: ProductService){}
  ngOnInit(){ 
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      categories => {
        this.categories = categories.map(category => ({
          ...category,
          length: 0 // We'll update this in a separate call
        }));
        this.updateCategoryLengths();
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  updateCategoryLengths(): void {
    this.categories.forEach(category => {
      this.productService.getProducts(category.name).subscribe(
        products => {
          category.length = products.length;
        },
        error => {
          console.error(`Error fetching products for ${category.name}:`, error);
        }
      );
    });
  }

  onCategorySelect(category: any) {
    // Chuyển hướng tới ShopComponent với type là category đã chọn
    this.router.navigate(['/shop'], { queryParams: { type: category.name } });
  }
}
