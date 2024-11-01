import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.html',
  styleUrl: './blogger.component.css'
})
export class BloggerComponent {
  bloggerForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: AdminService) {
    this.bloggerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specialty: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      bio: ['', [Validators.required, Validators.minLength(50)]],
      portfolioUrl: ['', Validators.pattern('https?://.+')]
    });
  }

  onSubmit() {
    if (this.bloggerForm.valid) {
      this.apiService.registerBlogger(this.bloggerForm.value).subscribe(
        response => {
          console.log('Blogger registered successfully', response);
          // Handle success (e.g., show success message, redirect)
        },
        error => {
          console.error('Error registering blogger', error);
          // Handle error (e.g., show error message)
        }
      );
    }
  }
}
