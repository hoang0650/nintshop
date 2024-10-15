import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { Review } from '../../interfaces/review';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() productId!: string; // Nhận ID sản phẩm từ component cha
  reviewForm: FormGroup;
  reviews: Review[] = [];
  users: any;
  products: any;
  newReview: any = { rating: 0, comment: '', createdAt: new Date(), productId: '', userId: '' };
  private subscriptions: Subscription = new Subscription(); // Biến để lưu các subscriptions
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
  }

  // Nhận dữ liệu thay đổi từ component cha
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && changes['productId'].currentValue) {
      this.setProductId(changes['productId'].currentValue);
      this.getReviews(); // Lấy lại danh sách review sau khi productId thay đổi
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Hủy tất cả các subscription
  }

  // Lấy thông tin người dùng
  loadUsers(): void {
    const userSub = this.userService.getUserInfor().subscribe(
      (data) => {
        this.users = data;
        if (this.users && this.users._id) {
          this.reviewForm.patchValue({ userId: this.users._id });
        }
      },
      (error) => console.error('Error fetching users:', error)
    );
    this.subscriptions.add(userSub); // Thêm subscription vào danh sách
  }

  // Gán productId vào form
  setProductId(productId: string): void {
    this.reviewForm.patchValue({ productId });
  }
  

  // Cập nhật số sao khi người dùng chọn
  setRating(star: number): void {
    this.newReview.rating = star;
    this.reviewForm.patchValue({ rating: star }); // Gán giá trị rating vào form
  }

  // Lấy tất cả các review cho sản phẩm
  getReviews(): void {
    const reviewSub = this.reviewService.getReviewsByProduct(this.productId).subscribe(
      (data: Review[]) => {
        this.reviews = data;
      },
      (error) => console.error('Error fetching reviews:', error)
    );
    this.subscriptions.add(reviewSub); // Thêm subscription vào danh sách
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
