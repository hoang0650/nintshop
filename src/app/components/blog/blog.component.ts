import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Subscription } from 'rxjs';
import { Blog } from '../../interfaces/blog';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: any
  private subscriptions: Subscription = new Subscription();
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const detailSub = this.blogService.getBlog(id).subscribe(
        (data: Blog) => {
          this.blogs = data;
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

}
