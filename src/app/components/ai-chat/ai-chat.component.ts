import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent {
  messages: { text: string; isUser: boolean }[] = [];
  userInput = '';
  folderPath = '';
  webUrl = '';
  username = '';
  password = '';
  isLoggedIn = false;
  token = '';
  availableLanguages: string[] = [];
  selectedLanguage = 'en';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getAvailableLanguages();
  }

  // getAvailableLanguages() {
  //   this.http.get<{languages: string[]}>('http://localhost:3000/api/ai/languages').subscribe(
  //     (response) => {
  //       this.availableLanguages = response.languages;
  //     },
  //     (error) => {
  //       console.error('Error fetching languages:', error);
  //     }
  //   );
  // }

  // login() {
  //   this.http.post('/api/login', { username: this.username, password: this.password })
  //     .subscribe(
  //       (response: any) => {
  //         this.token = response.token;
  //         this.isLoggedIn = true;
  //       },
  //       (error) => {
  //         console.error('Login error:', error);
  //         alert('Login failed. Please try again.');
  //       }
  //     );
  // }

  sendMessage() {
    if (this.userInput.trim() === '') return;

    this.messages.push({ text: this.userInput, isUser: true });

    this.http.post('http://localhost:3000/api/ai/chat', { message: this.userInput, language: this.selectedLanguage })
      .subscribe(
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

  trainFromFolder() {
    if (this.folderPath.trim() === '') return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.post('http://localhost:3000/api/ai/train/folder', { folderPath: this.folderPath }, { headers })
      .subscribe(
        (response: any) => {
          this.messages.push({ text: response.message, isUser: false });
        },
        (error) => {
          console.error('Error:', error);
          this.messages.push({ text: 'Xin lỗi, đã có lỗi xảy ra khi train từ folder.', isUser: false });
        }
      );

    this.folderPath = '';
  }

  trainFromWeb() {
    if (this.webUrl.trim() === '') return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.post('http://localhost:3000/api/ai/train/web', { url: this.webUrl }, { headers })
      .subscribe(
        (response: any) => {
          this.messages.push({ text: response.message, isUser: false });
        },
        (error) => {
          console.error('Error:', error);
          this.messages.push({ text: 'Xin lỗi, đã có lỗi xảy ra khi train từ web.', isUser: false });
        }
      );

    this.webUrl = '';
  }
}
