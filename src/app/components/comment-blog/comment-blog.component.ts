import { Component } from '@angular/core';
import { Comment, Reply } from '../../interfaces/comment';
@Component({
  selector: 'app-comment-blog',
  templateUrl: './comment-blog.component.html',
  styleUrl: './comment-blog.component.css'
})
export class CommentBlogComponent {
  comments: Comment[] = [
    {
      id: 1,
      author: 'Người dùng 1',
      content: 'Đây là bình luận đầu tiên.',
      date: new Date(),
      avatarUrl: 'https://example.com/avatar1.jpg',
      likes: 5,
      replies: [],
    },
    {
      id: 2,
      author: 'Người dùng 2',
      content: 'Bình luận thứ hai ở đây!',
      date: new Date(),
      avatarUrl: 'https://example.com/avatar2.jpg',
      likes: 2,
      replies: [],
    },
    // Thêm các bình luận khác...
  ];

  newComment: string = ''; // Để theo dõi nội dung bình luận mới
  newReply: { [key: number]: string } = {}; // Để theo dõi nội dung phản hồi cho mỗi bình luận

  likeComment(comment: Comment) {
    comment.likes += 1; // Tăng số lượt Like lên 1
  }

  toggleReplies(comment: Comment) {
    comment.showReplies = !comment.showReplies; // Chuyển đổi hiển thị phản hồi
  }

  addReply(comment: Comment) {
    if (this.newReply[comment.id]) {
      const reply: Reply = {
        author: 'Người dùng mới', // Hoặc lấy từ người dùng đang đăng nhập
        content: this.newReply[comment.id],
        date: new Date(),
        avatarUrl: 'https://example.com/avatar3.jpg', // Đường dẫn đến avatar của người dùng
      };
      comment.replies.push(reply); // Thêm phản hồi vào danh sách
      this.newReply[comment.id] = ''; // Xóa ô nhập
    }
  }

  addComment() {
    if (this.newComment) {
        const comment: Comment = {
            id: this.comments.length + 1, // Tạo ID cho bình luận mới
            author: 'Người dùng mới', // Hoặc lấy từ người dùng đang đăng nhập
            content: this.newComment,
            date: new Date(),
            avatarUrl: 'https://example.com/avatar4.jpg', // Đường dẫn đến avatar của người dùng
            likes: 0,
            replies: [],
        };
        this.comments.push(comment); // Thêm bình luận mới vào danh sách
        this.newComment = ''; // Xóa ô nhập
    }
}
}
