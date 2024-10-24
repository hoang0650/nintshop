import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../interfaces/blog';
import { SeoService } from '../../services/seo.service';

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
  constructor(private blogService: BlogService, private seoService: SeoService) { }

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
        this.seoService.updateTitle('Nintshop | trang mua sắm, thương mại và đăng tin hàng đầu');
          this.seoService.updateMetaTags([
            { name: 'description', content: 'Trang đăng tin bất động sản, mua sắm, thương mại hàng đầu tại nintshop.com.' },
            { name: 'keywords', content: 'đăng tin bất động sản, đăng tin bđs, mua sắm, thương mại hàng đầu, tin tức 24h, tin tuc 24h, nintshop, nintshop.com, tin tuc trong ngay, dang tin bat dong san, dang tin bds, mua sam, thuong mai hang dau, đọc truyện, bóng đá, thời trang, cười, tin tức trong ngày,  tintuc, doc truyen, 24h, tin nhanh , the thao, tin nhanh, thoi trang, thời sự, bong da, bao cong an, bao an ninh, thoi su, giai tri, giải trí, bao' }
        ]);
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
