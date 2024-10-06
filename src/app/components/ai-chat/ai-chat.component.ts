import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent {
  messages: { text: string; isUser: boolean }[] = [];
  userInput = '';
  selectedFile: File | null = null;
  ocrResult: string | null = null;
  objectDetectionResult: any | null = null;

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userInput.trim() === '') return;

    this.messages.push({ text: this.userInput, isUser: true });

    this.http.post('https://sale-nest-api.onrender.com/api/ai/chat', { message: this.userInput }).subscribe(
      (response: any) => {
        this.messages.push({ text: response.response, isUser: false });
      },
      (error) => {
        console.error('Error:', error);
        this.messages.push({ text: 'Xin lỗi, đã có lỗi xảy ra.', isUser: false });
      }
    );

    this.userInput = '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('https://sale-nest-api.onrender.com/api/ai/ocr', formData).subscribe(
        (response: any) => {
          this.ocrResult = response.text;
        },
        (error) => {
          console.error('Error:', error);
          this.ocrResult = 'Xin lỗi, đã có lỗi xảy ra khi xử lý OCR.';
        }
      );
    }
  }

  detectObjects() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('http://localhost:3000/api/ai/object-detection', formData).subscribe(
        (response: any) => {
          this.objectDetectionResult = response.detections;
        },
        (error) => {
          console.error('Error:', error);
          this.objectDetectionResult = 'Xin lỗi, đã có lỗi xảy ra khi nhận diện vật thể.';
        }
      );
    }
  }
}
