import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post: any;  // Nhận bài viết từ component cha
  newComment: string = '';  // Biến lưu trữ bình luận mới

  // Hàm xử lý khi nhấn nút "Thích"
  likePost(post: any) {
    post.likes++;
  }

  // Hàm xử lý khi nhấn nút "Bình luận"
  commentOnPost(post: any) {
    this.toggleComments(post);
    console.log('Bình luận trên bài viết:', post);
  }

  // Hàm xử lý khi nhấn nút "Chia sẻ"
  sharePost(post: any) {
    console.log('Chia sẻ bài viết:', post);
  }

  // Hàm để hiển thị/ẩn bình luận
  toggleComments(post: any) {
    post.showComments = !post.showComments;
  }

  // Hàm để thêm bình luận mới vào danh sách bình luận
  addComment(post: any) {
    if (this.newComment.trim()) {
      post.comments.push({
        content: this.newComment,
        likes: 0  // Mỗi bình luận mới ban đầu có 0 lượt thích
      });
      this.newComment = '';  // Reset trường nhập liệu sau khi thêm bình luận
    }
  }

  // Hàm xử lý khi nhấn nút "Thích" trên bình luận
  likeComment(comment: any) {
    comment.likes++;
  }
}
