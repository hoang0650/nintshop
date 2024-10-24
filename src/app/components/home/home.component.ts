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
      title: 'Nintshop | trang mua sắm, thương mại và đăng tin hàng đầu',
      description: 'Trang đăng tin bất động sản, mua sắm, thương mại hàng đầu tại nintshop.com.',
      image: '',
      url: 'www.nintshop.com',
    });
  }
}
