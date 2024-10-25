import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Subscription } from 'rxjs';
import { Blog } from '../../interfaces/blog';
import { SeoService } from '../../services/seo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit, OnDestroy {
  blog: any ;
  relatedPosts:any;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const detailSub = this.blogService.getBlogById(id).subscribe(
        (data: Blog) => {
          this.blog = data;
          this.seoService.setSocialShareTags({
            title: this.blog.title,
            description: this.blog.sections.map((item:any)=>item.content),
            image: '',
            url: 'www.nintshop.com',
          });
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
      this.subscriptions.add(detailSub); // Thêm subscription vào danh sách
    }
    if (id) {
      this.blogService.getRelatedProducts(id).subscribe(
        (products) => {
          this.relatedPosts = products;
        },
        (error) => {
          console.error('Error fetching related products:', error);
        }
      );
    }
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Hủy tất cả các subscription
  }

  limit = 5; // Số bài viết hiển thị ban đầu

  showMore() {
    this.limit += 5; // Hiển thị thêm 5 bài viết nữa mỗi lần nhấn "Xem thêm"
    window.location.href = '/blog';
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
