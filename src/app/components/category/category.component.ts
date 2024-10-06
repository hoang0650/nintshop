import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private router: Router){}
  categories = [
    { name: 'keychain', id: 1, img: 'nintshop_img/005/019-Ash&Pikachu.png', length:'4 Products' },
    { name: 'sticker', id: 2, img: 'nintshop_img/004/5.png', length:'1 Product' },
    // Các category khác
  ];

  onCategorySelect(category: any) {
    // Chuyển hướng tới ShopComponent với type là category đã chọn
    this.router.navigate(['/shop'], { queryParams: { type: category.name } });
  }
}
