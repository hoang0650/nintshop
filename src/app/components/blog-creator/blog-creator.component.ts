import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
@Component({
  selector: 'app-blog-creator',
  templateUrl: './blog-creator.component.html',
  styleUrl: './blog-creator.component.css'
})
export class BlogCreatorComponent {
  blogForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', Validators.required],
      videoUrl: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      this.blogService.createBlog(this.blogForm.value).subscribe(
        response => {
          this.successMessage = 'Bài blog đã được tạo thành công!';
          this.errorMessage = '';
          this.blogForm.reset();
        },
        error => {
          this.errorMessage = 'Có lỗi xảy ra khi tạo bài blog. Vui lòng thử lại.';
          this.successMessage = '';
        }
      );
    }
  }
}
