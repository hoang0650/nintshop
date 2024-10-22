import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../interfaces/blog';
@Component({
  selector: 'app-blog-creator',
  templateUrl: './blog-creator.component.html',
  styleUrl: './blog-creator.component.css'
})
export class BlogCreatorComponent {
  blogs: Blog[] = [];
  blogForm!: FormGroup;
  isEditMode = false;
  selectedBlogId: string ='';
  imagePreviews: { [key: string]: string } = {};
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
    this.initForm();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe(
      (blogs) => this.blogs = blogs,
      (error) => console.error(error)
    );
  }

  initForm(): void {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      author: ['', Validators.required],
      imageUrl: [''],
      sections: this.fb.array([])
    });
  }

  get sections(): FormArray {
    return this.blogForm.get('sections') as FormArray;
  }

  addSection(): void {
    this.sections.push(this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    }));
  }

  removeSection(index: number): void {
    this.sections.removeAt(index);
  }

  onFileSelected(event: any, type: string, index?: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'main') {
          this.imagePreviews['main'] = e.target.result;
        } else if (type === 'section' && index !== undefined) {
          this.imagePreviews[`section_${index}`] = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  editBlog(id:string, blog: Blog): void {
    this.isEditMode = true;
    this.selectedBlogId = id ;
    this.blogForm.patchValue(blog);
    this.sections.clear();
    blog.sections.forEach(section => {
      this.sections.push(this.fb.group({
        title: [section.title, Validators.required],
        content: [section.content, Validators.required],
      }));
    });
  }

  deleteBlog(id: string): void {
    this.blogService.deleteBlog(id).subscribe(
      () => {
        this.loadBlogs();
        this.successMessage = 'Blog deleted successfully';
      },
      (error) => this.errorMessage = 'Error deleting blog'
    );
  }

  onSubmit(): void {
    if (this.blogForm.invalid) return;

    const blogData = this.blogForm.value;
    if (this.isEditMode) {
      this.blogService.updateBlog(this.selectedBlogId,blogData).subscribe(
        response => {
          this.successMessage = 'Cập nhật bài blog thành công!';
          this.loadBlogs();
          this.resetForm();
        },
        error => this.errorMessage = 'Có lỗi khi cập nhật blog'
      );
    } else {
      this.blogService.createBlog(blogData).subscribe(
        response => {
          this.successMessage = 'Tạo bài blog thành công!';
          this.loadBlogs();
          this.resetForm();
        },
        error => this.errorMessage = 'Có lỗi khi tạo blog'
      );
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedBlogId = '';
    this.blogForm.reset();
    this.sections.clear();
    this.imagePreviews = {};
  }
}
