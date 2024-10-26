import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private seoService: SeoService){}
  ngOnInit(): void {
    this.seoService.setSocialShareTags({
      title: 'Nintshop | trang mua sắm, thương mại và đăng tin hàng đầu.',
      description: 'Trang đăng tin bất động sản, mua sắm, thương mại hàng đầu tại nintshop.com',
      image: 'https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0',
      url: 'www.nintshop.com',
    });
  }
}
