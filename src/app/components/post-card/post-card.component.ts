import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post: any;

  likePost(post: any) {
    post.likes++;
  }

  commentOnPost(post: any) {
    // Logic for adding a comment can be implemented here
    console.log('Bình luận trên bài viết:', post);
  }

  sharePost(post: any) {
    // Logic for sharing the post
    console.log('Chia sẻ bài viết:', post);
  }
}
