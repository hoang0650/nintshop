import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../interfaces/blog';
@Component({
  selector: 'app-blog-creator',
  templateUrl: './blog-creator.component.html',
  styleUrl: './blog-creator.component.css'
})
export class BlogCreatorComponent {
  blogForm: FormGroup;
  blogs: Blog[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  isEditMode: boolean = false;
  currentBlogId: string | null = null;
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      author: ['', Validators.required],
      sections: this.fb.array([])
    });
  }

  ngOnInit() {
    this.loadBlogs();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadBlogData(id);
      } else {
        this.resetForm();
      }
    });
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe(
      (blogs) => {
        this.blogs = blogs;
      },
      (error) => {
        console.error('Error loading blogs:', error);
        this.errorMessage = 'Không thể tải danh sách blog. Vui lòng thử lại.';
      }
    );
  }

  get sections() {
    return this.blogForm.get('sections') as FormArray;
  }

  addSection() {
    this.sections.push(this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      videoUrl: [''],
      imageUrl: ['']
    }));
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  loadBlogData(id: string) {
    this.blogService.getBlog(id).subscribe(
      (blog) => {
        this.isEditMode = true;
        this.currentBlogId = id;
        this.blogForm.patchValue({
          title: blog.title,
          author: blog.author
        });
        this.sections.clear();
        blog.sections.forEach((section: any) => {
          this.sections.push(this.fb.group({
            title: [section.title, Validators.required],
            content: [section.content, Validators.required],
            videoUrl: [section.videoUrl || ''],
            imageUrl: [section.imageUrl || '']
          }));
        });
      },
      (error) => {
        console.error('Error loading blog:', error);
        this.errorMessage = 'Không thể tải dữ liệu bài blog. Vui lòng thử lại.';
      }
    );
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formData = new FormData();
      formData.append('productData', JSON.stringify(this.blogForm.value));
      this.selectedFiles.forEach((file, index) => {
        formData.append('images', file, file.name);
      });
      if (this.isEditMode && this.currentBlogId) {
        this.blogService.updateBlog(this.currentBlogId, formData).subscribe(
          response => {
            this.successMessage = 'Bài blog đã được cập nhật thành công!';
            this.errorMessage = '';
            this.loadBlogs();
            this.resetForm();
          },
          error => {
            this.errorMessage = 'Có lỗi xảy ra khi cập nhật bài blog. Vui lòng thử lại.';
            this.successMessage = '';
          }
        );
      } else {
        this.blogService.createBlog(formData).subscribe(
          response => {
            this.successMessage = 'Bài blog đã được tạo thành công!';
            this.errorMessage = '';
            this.loadBlogs();
            this.resetForm();
          },
          error => {
            this.errorMessage = 'Có lỗi xảy ra khi tạo bài blog. Vui lòng thử lại.';
            this.successMessage = '';
          }
        );
      }
    }
  }

  editBlog(blog: Blog) {
    this.loadBlogData(blog._id!);
  }

  deleteBlog(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa bài blog này?')) {
      this.blogService.deleteBlog(id).subscribe(
        () => {
          this.successMessage = 'Bài blog đã được xóa thành công!';
          this.errorMessage = '';
          this.loadBlogs();
          if (this.currentBlogId === id) {
            this.resetForm();
          }
        },
        error => {
          this.errorMessage = 'Có lỗi xảy ra khi xóa bài blog. Vui lòng thử lại.';
          this.successMessage = '';
        }
      );
    }
  }

  onFileSelected(event: any, controlName: string, sectionIndex?: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (sectionIndex !== undefined) {
          const sectionImages = this.sections.at(sectionIndex).get('images') as FormArray;
          sectionImages.push(this.fb.control(e.target.result));
        } else {
          this.blogForm.patchValue({ [controlName]: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onFilesSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = element.files;

    if (files) {
      this.selectedFiles = Array.from(files);
      this.imagePreviews = [];
      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  resetForm() {
    this.blogForm.reset();
    this.sections.clear();
    this.addSection();
    this.isEditMode = false;
    this.currentBlogId = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
