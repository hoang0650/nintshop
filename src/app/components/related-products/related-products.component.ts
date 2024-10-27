import { Component, OnInit, Input } from '@angular/core';
import { ProductApiService } from '../../services/product-api.service';
// import { Product } from '../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MessageService } from '../../services/message.service';
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}
@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit {
  products: Product[] = [
    { id: 1, name: "Sản phẩm 1", price: "199.000đ", image: "https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0" },
    { id: 2, name: "Sản phẩm 2", price: "249.000đ", image: "https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0" },
    { id: 3, name: "Sản phẩm 3", price: "299.000đ", image: "https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0" },
    { id: 4, name: "Sản phẩm 4", price: "349.000đ", image: "https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0" },
    { id: 5, name: "Sản phẩm 5", price: "399.000đ", image: "https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0" },
    { id: 6, name: "Sản phẩm 6", price: "449.000đ", image: "https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0" },
  ];

  carouselConfig = {
    dots: false,
    nzAutoPlay: true,
    nzAutoPlaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  constructor() { }

  ngOnInit(): void { }
}
