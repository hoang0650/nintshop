import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() productId!: string;  // Nhận ID sản phẩm từ component cha
  reviewForm: FormGroup;
  products: any;
  reviews: Review[] = [];
  users: any;
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 3;
  newReview: Review | null = { rating: 0, comment: '', createdAt: new Date(), productId: this.productId, userId: '' }; // Khởi tạo với giá trị mặc định
  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    // FormGroup với các trường cần thiết cho đánh giá
    this.reviewForm = this.fb.group({
      createdAt: [new Date(), Validators.required],
      comment: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      productId: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.getReviews();
    this.setProductId(); // Gán productId vào form sau khi nhận từ ngOnInit
  }

  loadUsers(): void {
    this.userService.getUserInfor().subscribe(
      (data) => {
        this.users = data;
        // Gán giá trị userId vào form (giả định rằng có một userId có sẵn)
        if (this.users && this.users._id) {
          this.reviewForm.patchValue({ userId: this.users._id });
        }
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  // Lấy thông tin sản phẩm và gán productId vào form
  setProductId(): void {
    this.reviewForm.patchValue({ productId: this.productId }); // Gán giá trị productId vào form
  }

  getReviews(): void {
    this.reviewService.getReviewsByProduct(this.productId).subscribe((data: Review[]) => {
      this.reviews = data;
    }, (error) => {
      console.error('Error fetching reviews:', error);
    });
  }

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
