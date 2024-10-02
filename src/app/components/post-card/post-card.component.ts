import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post: any;
  showComments: boolean = false;
  newComment: string = '';

  // Thêm lượt thích (like)
  likePost() {
    this.post.likes++;
  }

  // Hiển thị hoặc ẩn phần bình luận
  toggleCommentSection() {
    this.showComments = !this.showComments;
  }

  // Thêm bình luận mới
  addComment() {
    if (this.newComment.trim()) {
      this.post.comments.push({ author: 'Người dùng', text: this.newComment });
      this.newComment = '';
    }
  }

  // Chia sẻ bài viết (hiện thông báo chia sẻ)
  sharePost() {
    alert('Đã chia sẻ bài viết!');
  }
}
