import { Component } from '@angular/core';
import { Chatbox } from '../../interfaces/chatbox';
import { AIService } from '../../services/ai.service';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent {
  messages: Chatbox[] = [
    { sender: 'Bot', text: 'Xin chào! Chúng tôi rất vui được hỗ trợ bạn. Bạn cần giúp đỡ gì ạ?', link:'',displayText:'' }
  ];
  newMessage: string = '';
  isChatVisible: boolean = false;
  isBotTyping = false;
  status = 'Ready';
  error = false;
  trainedModels: string[] = [];
  isSupportAgentAvailable = true; // Đánh dấu nếu hỗ trợ viên đang online

  constructor(private aiService: AIService) {}
  ngOnInit() {
    this.loadTrainedModels();
  }

  loadTrainedModels() {
    this.aiService.getTrainedModels().subscribe(
      models => {
        this.trainedModels = models;
      },
      error => {
        console.error('Failed to load trained models', error);
        this.status = 'Failed to load trained models';
        this.error = true;
      }
    );
  }
  sendMessage() {
    this.isBotTyping = true;
    this.error = false;
    this.aiService.queryAI(this.newMessage).subscribe(
      response => {
        this.messages.push({ sender: 'Bạn', text: this.newMessage });
        if (this.isSupportAgentAvailable) {
          // Nếu hỗ trợ viên đang online, họ trả lời
          this.messages.push({ sender: 'Hỗ trợ viên', text: 'Chào bạn! Tôi có thể giúp gì cho bạn?' });
      } else {
          // Nếu không, bot sẽ trả lời
          this.messages.push({ sender: 'Bot', text: 'Hỗ trợ viên hiện không khả dụng, tôi có thể giúp gì?' });
      }
        setTimeout(() => {
                this.messages.push({ sender: 'Bot', text: response.response });
                this.isBotTyping = false;
              }, 1000);
        this.newMessage = '';
        this.status = 'Query completed';
      },
      error => {
        console.error('Query failed', error);
        this.newMessage = 'Error occurred while querying AI';
        this.status = 'Query failed';
        this.error = true;
      }
    );
  }

  // Hàm gửi tin nhắn
  // sendMessage() {
  //   if (this.newMessage.trim() !== '') {
  //     this.messages.push({ sender: 'Bạn', text: this.newMessage });
  //     this.newMessage = '';
  //     setTimeout(() => {
  //       this.messages.push({ sender: 'Bot', text: 'Bạn có thể liên hệ trực tiếp qua:' });
  //       this.messages.push({ sender: 'Bot', link: 'https://www.facebook.com/profile.php?id=61566602871136', displayText: 'Fanpage của chúng tôi' });
  //       this.messages.push({ sender: 'Bot', text: 'hoặc số điện thoại: 0931881584 để được hỗ trợ tư vấn.' });
  //     }, 1000);
  //   }
  // }

  // Hàm để ẩn/hiện khung chat
  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

}
