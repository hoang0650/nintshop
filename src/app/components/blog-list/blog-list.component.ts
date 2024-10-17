import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

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

  blogs: any[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.loadBlogs();
  }

  // blogPosts: BlogPost[] = [
  //   {
  //     id: 1,
  //     title: 'Khám phá vẻ đẹp của Hạ Long',
  //     excerpt: 'Hạ Long - kỳ quan thiên nhiên thế giới với những hòn đảo đá vôi tuyệt đẹp và hang động kỳ bí...',
  //     author: 'Nguyễn Văn A',
  //     date: '15/10/2024',
  //     imageUrl: '/placeholder.svg?height=200&width=300'
  //   },
  //   {
  //     id: 2,
  //     title: 'Ẩm thực đường phố Sài Gòn',
  //     excerpt: 'Khám phá nền ẩm thực đa dạng và phong phú của Sài Gòn qua những món ăn đường phố nổi tiếng...',
  //     author: 'Trần Thị B',
  //     date: '12/10/2024',
  //     imageUrl: '/placeholder.svg?height=200&width=300'
  //   },
  //   {
  //     id: 3,
  //     title: 'Lễ hội hoa Đà Lạt',
  //     excerpt: 'Đà Lạt - thành phố ngàn hoa tổ chức lễ hội hoa lớn nhất trong năm, thu hút hàng nghìn du khách...',
  //     author: 'Lê Văn C',
  //     date: '10/10/2024',
  //     imageUrl: '/placeholder.svg?height=200&width=300'
  //   },
  //   {
  //     id: 4,
  //     title: 'Khám phá Phố cổ Hội An',
  //     excerpt: 'Hội An - nơi thời gian như ngừng lại với những ngôi nhà cổ, đèn lồng và những con phố nhỏ...',
  //     author: 'Phạm Thị D',
  //     date: '08/10/2024',
  //     imageUrl: '/placeholder.svg?height=200&width=300'
  //   },
  //   {
  //     id: 5,
  //     title: 'Vẻ đẹp hoang sơ của Côn Đảo',
  //     excerpt: 'Côn Đảo - hòn đảo xinh đẹp với bãi biển trong xanh, rừng nguyên sinh và di tích lịch sử...',
  //     author: 'Hoàng Văn E',
  //     date: '05/10/2024',
  //     imageUrl: '/placeholder.svg?height=200&width=300'
  //   },
  //   {
  //     id: 6,
  //     title: 'Du lịch Sapa - Thiên đường mây',
  //     excerpt: 'Sapa - nơi bạn có thể chạm tay vào mây, khám phá văn hóa dân tộc và chinh phục đỉnh Fansipan...',
  //     author: 'Ngô Thị F',
  //     date: '02/10/2024',
  //     imageUrl: '/placeholder.svg?height=200&width=300'
  //   }
  // ]
  currentPage = 1;
  totalPages = 3; // Giả sử có 3 trang
  loadBlogs() {
    this.blogService.getBlogs().subscribe(
      (data) => {
        this.blogs = data;
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  editBlog(id: string) {
    // Implement edit logic (e.g., navigate to edit page or open modal)
    console.log('Edit blog:', id);
  }

  deleteBlog(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa bài blog này?')) {
      this.blogService.deleteBlog(id).subscribe(
        () => {
          this.blogs = this.blogs.filter(blog => blog._id !== id);
        },
        (error) => {
          console.error('Error deleting blog:', error);
        }
      );
    }
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
