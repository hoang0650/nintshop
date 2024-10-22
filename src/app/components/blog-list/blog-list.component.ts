import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../interfaces/blog';

// interface BlogPost {
//   id: number;
//   title: string;
//   excerpt: string;
//   author: string;
//   date: string;
//   imageUrl: string;
// }

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {

  blogs: any[]=[];
  filteredBlogs: any[] = [];
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.loadBlogs();
  }

  currentPage = 1;
  totalPages = 100; // Giả sử có 3 trang
  loadBlogs() {
    this.blogService.getBlogs().subscribe(
      (data) => {
        this.blogs = data;
        this.filteredBlogs = [...this.blogs];
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  get uniqueCategories() {
    return this.blogs
      .map(blog => blog.type) // Lấy tất cả type
      .filter((type, index, self) => self.indexOf(type) === index); // Lọc để giữ duy nhất
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      // Thực hiện logic để lấy dữ liệu trang trước
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // Thực hiện logic để lấy dữ liệu trang tiếp theo
    }
  }
}
