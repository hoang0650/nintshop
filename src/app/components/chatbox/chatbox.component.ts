import { Component } from '@angular/core';
import { Chatbox } from '../../interfaces/chatbox';
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
  // Hàm gửi tin nhắn
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Thêm tin nhắn của người dùng vào danh sách
      this.messages.push({ sender: 'Bạn', text: this.newMessage });
      this.newMessage = '';

      // Giả lập phản hồi từ bot sau 1 giây
      setTimeout(() => {
        this.messages.push({ sender: 'Bot', text: 'Bạn có thể liên hệ trực tiếp qua:' });
        this.messages.push({ sender: 'Bot', link: 'https://www.facebook.com/profile.php?id=61566602871136', displayText: 'Fanpage của chúng tôi' });
        this.messages.push({ sender: 'Bot', text: 'hoặc số điện thoại: 0931881584 để được hỗ trợ tư vấn.' });
      }, 1000);
    }
  }

  // Hàm để ẩn/hiện khung chat
  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

}
