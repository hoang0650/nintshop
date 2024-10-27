import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent implements OnInit {
  constructor(private seoService: SeoService){}
  ngOnInit(): void {
    this.seoService.setSocialShareTags({
      title: 'Nintshop | FAQs - Câu hỏi thường gặp.',
      description: 'FAQs - Câu hỏi thường gặp',
      image: 'https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0',
      url: 'www.nintshop.com',
    });
  }
 
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: true,
          name: 'This is panel header 1-1'
        },
        {
          active: false,
          name: 'This is panel header 1-2'
        }
      ]
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];
  
}
