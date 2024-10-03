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

  friends = [
    { avatarUrl: 'img/cat-1.jpg', name: 'Follower 1', location: 'Hồ Chí Minh' },
    { avatarUrl: 'img/cat-2.jpg', name: 'Follower 2', location: 'Hà Nội' },
    { avatarUrl: 'img/cat-3.jpg', name: 'Follower 3', location: 'Đà Nẵng' },
    { avatarUrl: 'img/cat-4.jpg', name: 'Follower 4', location: 'Đồng Nai' },
  ];
  

  addPost(newPost: any) {
    this.posts.unshift(newPost);
  }

  
}
