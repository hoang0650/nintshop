import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Subscription } from 'rxjs';
import { Blog } from '../../interfaces/blog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit, OnDestroy {
  blog: any ;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const detailSub = this.blogService.getBlogById(id).subscribe(
        (data: Blog) => {
          this.blog = data;
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
      this.subscriptions.add(detailSub); // Thêm subscription vào danh sách
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Hủy tất cả các subscription
  }

  getMetaDescription(blog: Blog): string {
    // Tạo meta description dựa trên nội dung của các section hoặc tiêu đề
    if (!blog || !blog.sections || blog.sections.length === 0) return '';
    const firstSection = blog.sections[0].content;
    const plainText = firstSection.replace(/<[^>]+>/g, ''); // Loại bỏ các thẻ HTML
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getCanonicalUrl(): string {
    return window.location.href;
  }

  relatedPosts = [
    // Dữ liệu mẫu cho bài viết liên quan
    { slug: 'bai-viet-1', title: 'Bài viết 1', author: 'Tác giả 1', imageUrl: 'nintshop_img/001/001-Pikachu.png' },
    { slug: 'bai-viet-2', title: 'Bài viết 2', author: 'Tác giả 2', imageUrl: 'nintshop_img/001/001-Pikachu.png' },
    // Thêm các bài viết khác...
  ];

  limit = 5; // Số bài viết hiển thị ban đầu

  showMore() {
    this.limit += 5; // Hiển thị thêm 5 bài viết nữa mỗi lần nhấn "Xem thêm"
  }

}
