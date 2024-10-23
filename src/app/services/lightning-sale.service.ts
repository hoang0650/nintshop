import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    // discountPercentage: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class LightningSaleService {
  private apiUrl = 'http://localhost:3000/api/campaigns'; 

  constructor(private productService: ProductApiService,private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.productService.getProducts();
  }

  createCampaign(campaign: LightningSaleCampaign): Observable<LightningSaleCampaign> {
    return this.http.post<LightningSaleCampaign>(this.apiUrl, campaign);
  }

  getCampaigns(): Observable<LightningSaleCampaign[]> {
    return this.http.get<any>(this.apiUrl);
  }
}