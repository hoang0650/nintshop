import { Component, OnInit} from '@angular/core';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent implements OnInit {
  relatedProducts: Product[] = [];

  constructor(private productService: ProductApiService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getRelatedProducts(id).subscribe(
        (products) => {
          this.relatedProducts = products;
        },
        (error) => {
          console.error('Error fetching related products:', error);
        }
      );
    }
  }

  getSlides(): any[] {
    const slides = [];
    for (let i = 0; i < this.relatedProducts.length; i += 4) {
      slides.push(this.relatedProducts.slice(i, i + 4));
    }
    return slides;
  }
}
