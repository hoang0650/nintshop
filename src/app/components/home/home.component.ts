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
    this.seoService.updateTitle('Nintshop | trang mua sắm, thương mại và đăng tin hàng đầu');
          this.seoService.updateMetaTags([
            { name: 'description', content: 'Trang đăng tin bất động sản, mua sắm, thương mại hàng đầu tại nintshop.com.' },
            { name: 'keywords', content: 'đăng tin bất động sản, đăng tin bđs, mua sắm, thương mại hàng đầu, tin tức 24h, tin tuc 24h, nintshop, nintshop.com, tin tuc trong ngay, dang tin bat dong san, dang tin bds, mua sam, thuong mai hang dau, đọc truyện, bóng đá, thời trang, cười, tin tức trong ngày,  tintuc, doc truyen, 24h, tin nhanh , the thao, tin nhanh, thoi trang, thời sự, bong da, bao cong an, bao an ninh, thoi su, giai tri, giải trí, bao' }
    ]);
  }
}
