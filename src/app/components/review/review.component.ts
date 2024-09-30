import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() productId!: string; // Nhận ID sản phẩm từ component cha
  reviewForm: FormGroup;
  reviews: Review[] = [];
  users: any;
  products: any;
  newReview: any = { rating: 0, comment: '', createdAt: new Date(), productId: '', userId: '' };

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // Khởi tạo form đánh giá
    this.reviewForm = this.fb.group({
      createdAt: [new Date(), Validators.required],
      comment: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      productId: [],
      userId: []
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.getReviews();
    this.setProductId(); // Gán productId vào form sau khi nhận từ ngOnInit
  }

  // Lấy thông tin người dùng
  loadUsers(): void {
    this.userService.getUserInfor().subscribe(
      (data) => {
        this.users = data;
        // Gán giá trị userId vào form
        if (this.users && this.users._id) {
          this.reviewForm.patchValue({ userId: this.users._id });
        }
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  // Gán productId vào form
  setProductId(): void {
    this.reviewForm.patchValue({ productId: this.productId });
  }

  // Cập nhật số sao khi người dùng chọn
  setRating(star: number): void {
    this.newReview.rating = star;
    this.reviewForm.patchValue({ rating: star }); // Gán giá trị rating vào form
  }

  // Lấy tất cả các review cho sản phẩm
  getReviews(): void {
    this.reviewService.getReviewsByProduct(this.productId).subscribe(
      (data: Review[]) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  // Gửi review mới
  submitReview(): void {
    if (this.reviewForm.valid) {
      const newReview: Review = this.reviewForm.value;
      this.reviewService.addReview(newReview).subscribe(
        (data: Review) => {
          this.reviews.push(data); // Thêm review mới vào danh sách
          this.reviewForm.reset({ rating: 0, comment: '' }); // Reset form sau khi gửi
          this.newReview = null;
        },
        (error) => console.error('Error submitting review:', error)
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
