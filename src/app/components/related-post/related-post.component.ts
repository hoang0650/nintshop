import { Component } from '@angular/core';

@Component({
  selector: 'app-related-post',
  templateUrl: './related-post.component.html',
  styleUrl: './related-post.component.css'
})
export class RelatedPostComponent {
  relatedPosts = [
    { title: 'Bài viết liên quan 1' },
    { title: 'Bài viết liên quan 2' },
    { title: 'Bài viết liên quan 3' },
    // Thêm các bài viết liên quan khác
  ];
}
