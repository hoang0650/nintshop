import { Component } from '@angular/core';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent {
  posts = [
    { content: 'Tính năng sắp ra mắt! Trang shoppage của chúng tôi giúp kết nối các nhà bán hàng và sẽ nâng cấp lên thành mạng xã hội dành cho nhà bán hàng tin dùng.', image: 'assets/post-image.jpg', likes: 15 }
  ];

  addPost(newPost: any) {
    this.posts.unshift(newPost);
  }

  
}
