import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../interfaces/blog';
import { SeoService } from '../../../services/seo.service';

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

  blogs: any;         // Dữ liệu blog từ API
  filteredBlogs: Blog[] = [];  // Dữ liệu blog sau khi lọc (nếu có)
  selectedCategory = 'All';    // Danh mục được chọn
  searchTerm = '';             // Từ khóa tìm kiếm
  currentPage = 1;             // Trang hiện tại
  totalBlogs = 0;              // Tổng số bài blog
  pageSize = 12;               // Số lượng blog mỗi trang
  isLoading = false;           // Trạng thái loading

  constructor(
    private blogService: BlogService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.loadBlogs(this.currentPage);  // Load blog ban đầu
  }

  // Tải blog theo trang và tìm kiếm (nếu có)
  loadBlogs(page: number) {
    this.isLoading = true;
    this.blogService.getBlogsWithPagination(page, this.pageSize, this.searchTerm).subscribe(
      (data) => {
        this.blogs = data.blogs;
        this.totalBlogs = data.totalCount;
        this.filteredBlogs = [...this.blogs]; // Sao chép dữ liệu blogs vào filteredBlogs
        this.isLoading = false;
        this.seoService.setSocialShareTags({
          title: 'Nintshop | trang mua sắm, thương mại và đăng tin hàng đầu',
          description: 'Trang đăng tin bất động sản, mua sắm, thương mại hàng đầu tại nintshop.com.',
          image: 'https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0',
          url: 'www.nintshop.com',
        });
      },
      (error) => {
        console.error('Error fetching blogs:', error);
        this.isLoading = false;
      }
    );
  }

  // Sự kiện khi thay đổi trang
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadBlogs(page);
  }

  // Sự kiện khi tìm kiếm
  onSearch() {
    this.currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
    this.loadBlogs(this.currentPage);
  }

  // Lọc theo danh mục
  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filterBlogs();
  }

  // Lọc theo danh mục và tiêu đề
  filterBlogs() {
    this.filteredBlogs = this.blogs.filter((blog:any) => {
      const matchesCategory = this.selectedCategory === 'All' || blog.type === this.selectedCategory;
      const matchesSearchTerm = blog.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  }

  get uniqueCategories() {
    return this.blogs
      .map((blog:any) => blog.type) // Lấy tất cả type
      .filter((type:any, index:any, self:any) => self.indexOf(type) === index); // Lọc để giữ duy nhất
  }

}
