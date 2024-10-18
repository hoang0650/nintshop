import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { ProductApiService } from './product-api.service';
export interface LightningSaleCampaign {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  products: {
    product: Product;
    discountPrice: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class LightningSaleService {
  private campaigns: LightningSaleCampaign[] = [];

  constructor(private productService: ProductApiService) { }

  getProducts(): Observable<Product[]> {
    return this.productService.getProducts();
  }

  createCampaign(campaign: LightningSaleCampaign): Observable<LightningSaleCampaign> {
    campaign.id = Date.now().toString();
    this.campaigns.push(campaign);
    return of(campaign).pipe(delay(500)); // Simulate network delay
  }

  getCampaigns(): Observable<LightningSaleCampaign[]> {
    return of(this.campaigns).pipe(delay(500)); // Simulate network delay
  }
}