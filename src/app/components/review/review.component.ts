import { Component , Input, OnInit} from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() productId!: string;
  reviews: any[] = [];
  newReview = {
    userId: '',  // Cần lấy thông tin từ user đã đăng nhập
    productId: '',
    rating: 0,
    comment: ''
  };

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.newReview.productId = this.productId;
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getReviews(this.productId).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (error) => console.error('Lỗi khi tải đánh giá:', error)
    });
  }

  submitReview() {
    // Cần thêm kiểm tra đăng nhập để lấy userId từ người dùng hiện tại
    this.reviewService.postReview(this.newReview).subscribe({
      next: () => {
        this.loadReviews(); // Tải lại danh sách đánh giá sau khi thêm mới
      },
      error: (error) => console.error('Lỗi khi gửi đánh giá:', error)
    });
  }
}
