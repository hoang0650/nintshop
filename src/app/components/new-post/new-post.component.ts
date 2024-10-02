import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  postContent: string = '';
  selectedFile: File | null = null;

  @Output() postCreated = new EventEmitter<any>();

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createPost() {
    const newPost = {
      content: this.postContent,
      image: this.selectedFile ? URL.createObjectURL(this.selectedFile) : null,
      likes: 0
    };

    this.postCreated.emit(newPost);
    this.postContent = '';
    this.selectedFile = null;
  }
}
