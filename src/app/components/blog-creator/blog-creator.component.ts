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
  selectedBlogId: string | null = null;
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
      videoUrl: [''],
      images: ['']
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

  editBlog(blog: Blog): void {
    this.isEditMode = true;
    this.selectedBlogId = blog._id || null;
    this.blogForm.patchValue(blog);
    this.sections.clear();
    blog.sections.forEach(section => {
      this.sections.push(this.fb.group({
        title: [section.title, Validators.required],
        content: [section.content, Validators.required],
        videoUrl: [section.videoUrl],
        images: [section.images || []]
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
    if (this.blogForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('blogData', JSON.stringify(this.blogForm.value));
    const imageUrl = this.blogForm.get('imageUrl')?.value;

    if (this.isEditMode && this.selectedBlogId) {
      this.blogService.updateBlog(this.selectedBlogId, formData).subscribe(
        () => {
          this.loadBlogs();
          this.resetForm();
          this.successMessage = 'Blog updated successfully';
        },
        (error) => this.errorMessage = 'Error updating blog'
      );
    } else {
      this.blogService.createBlog(formData).subscribe(
        () => {
          this.loadBlogs();
          this.resetForm();
          this.successMessage = 'Blog created successfully';
        },
        (error) => this.errorMessage = 'Error creating blog'
      );
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedBlogId = null;
    this.blogForm.reset();
    this.sections.clear();
    this.imagePreviews = {};
  }
}
