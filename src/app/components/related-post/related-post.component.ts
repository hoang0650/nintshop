import { Component } from '@angular/core';

@Component({
  selector: 'app-related-post',
  templateUrl: './related-post.component.html',
  styleUrl: './related-post.component.css'
})
export class RelatedPostComponent {
  relatedPosts = [
    // Dữ liệu mẫu cho bài viết liên quan
    { slug: 'bai-viet-1', title: 'Bài viết 1', author: 'Tác giả 1', imageUrl: 'link-to-image-1' },
    { slug: 'bai-viet-2', title: 'Bài viết 2', author: 'Tác giả 2', imageUrl: 'link-to-image-2' },
    // Thêm các bài viết khác...
  ];
  limit = 5; // Số bài viết hiển thị ban đầu

  showMore() {
    this.limit += 5; // Hiển thị thêm 5 bài viết nữa mỗi lần nhấn "Xem thêm"
  }
}
