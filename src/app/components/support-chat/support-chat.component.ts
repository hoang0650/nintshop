import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
@Component({
  selector: 'app-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrl: './support-chat.component.css'
})
export class SupportChatComponent {
  friends: any[] = [];
  groups: any[] = [];
  messages: any[] = [];
  selectedChatName: string = '';
  newMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    // Dữ liệu demo cho bạn bè và nhóm
    this.friends = [
      { id: 1, name: 'Phan Hoàng', avatar: 'path-to-avatar1.jpg', online: true },
      { id: 2, name: 'Nguyễn Quang', avatar: 'path-to-avatar2.jpg', online: false }
    ];

    this.groups = [
      { id: 1, name: 'Nhóm hỗ trợ 1' },
      { id: 2, name: 'Nhóm hỗ trợ 2' }
    ];

    // Dữ liệu demo tin nhắn
    this.messages = [
      { sender: 'Bạn', text: 'Xin chào!' },
      { sender: 'Phan Hoàng', text: 'Chào bạn, tôi có thể giúp gì cho bạn?' }
    ];
  }

  // Chọn bạn bè để chat
  selectFriend(friend: any) {
    this.selectedChatName = friend.name;
    // Thay đổi tin nhắn theo người dùng
    this.messages = [
      { sender: 'Bạn', text: `Tin nhắn với ${friend.name}` },
      { sender: friend.name, text: 'Đây là nội dung cuộc trò chuyện.' }
    ];
  }

  // Chọn nhóm để chat
  selectGroup(group: any) {
    this.selectedChatName = group.name;
    // Thay đổi tin nhắn theo nhóm
    this.messages = [
      { sender: 'Bạn', text: `Bạn đang chat trong ${group.name}` },
      { sender: group.name, text: 'Đây là nội dung cuộc trò chuyện nhóm.' }
    ];
  }

  // Gửi tin nhắn
  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'Bạn', text: this.newMessage });
      this.newMessage = '';
    }
  }
  // activeSessions: any[] = [];
  // currentSession: any;
  // newMessage: string = '';
  // constructor(private sessionService: SessionService) {}
  // ngOnInit() {
  //   this.loadActiveSessions();
  // }

  // loadActiveSessions() {
  //   this.sessionService.getActiveSessions().subscribe((sessions: any) => {
  //     this.activeSessions = sessions;
  //   });
  // }

  // openSession(sessionId: string) {
  //   const session = this.activeSessions.find(s => s._id === sessionId);
  //   this.currentSession = session;
  // }

  // sendMessage() {
  //   if (this.newMessage.trim()) {
  //     this.sessionService.sendMessage(this.currentSession._id, { sender: 'support', text: this.newMessage }).subscribe((session: any) => {
  //       this.currentSession = session;
  //       this.newMessage = '';
  //     });
  //   }
  // }

  // closeSession(sessionId: string) {
  //   this.sessionService.closeSession(sessionId).subscribe((session: any) => {
  //     this.currentSession = null;
  //     this.loadActiveSessions();
  //   });
  // }
}
