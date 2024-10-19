import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-blog',
  templateUrl: './comment-blog.component.html',
  styleUrl: './comment-blog.component.css'
})
export class CommentBlogComponent {
  comments = [
    { author: 'Người dùng 1', content: 'Bình luận 1...' }
    // Thêm các bình luận khác
  ];
}
