import { Component, OnInit } from '@angular/core';
import { Comment, Reply } from '../../interfaces/comment';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-comment-blog',
  templateUrl: './comment-blog.component.html',
  styleUrl: './comment-blog.component.css'
})
export class CommentBlogComponent implements OnInit {
  blogId!: string;
  comments: Comment[] = [];
  newComment: Comment = { id:'', author: '', content: '', date: new Date(), avatarUrl: 'nintshop_img/default.png' };
  replyContent: string = '';
  replyToCommentId: string | null = null;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id')!;
    console.log(' this.blogId', this.blogId)
    this.loadComments();
  }

  loadComments(): void {
    this.blogService.getComments(this.blogId).subscribe(comments => {
      this.comments = comments;
    });
  }

  addComment(): void {
    if (this.newComment.author && this.newComment.content) {
      this.blogService.addComment(this.blogId, this.newComment).subscribe(comment => {
        this.comments.push(comment);
        this.newComment = {id:'', author: '', content: '', date: new Date(), avatarUrl: '' }; // Reset input
      });
    }
  }

  addReply(commentId: string): void {
    if (this.replyContent) {
      const reply: Reply = { author: this.newComment.author, content: this.replyContent, date: new Date(), avatarUrl: 'nintshop_img/default.png' };
      this.blogService.addReply(this.blogId, commentId, reply).subscribe(reply => {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
          comment.replies ? comment.replies.push(reply) : comment.replies = [reply];
        }
        this.replyContent = ''; // Reset input
        this.replyToCommentId = null; // Close reply input
      });
    }
  }
}
