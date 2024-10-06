import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

interface ChatMessage {
  username: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

interface Gift {
  name: string;
  image: string;
}

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss']
})
export class LivestreamComponent implements OnInit {
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  liveTimer: string = '00:00:00';
  viewCount: number = 0;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  showMore: boolean = false;
  isChatCollapsed: boolean = false;
  isLiked: boolean = false;
  isMuted: boolean = false;
  isGiftModalOpen: boolean = false;
  isCartView: boolean = false;
  localStream: MediaStream | undefined;
  gifts: Gift[] = [
    { name: 'Pikachu', image: 'nintshop_img/005/014-Pikachu.png' },
    { name: 'Articuno', image: 'nintshop_img/005/001-Articuno.png' },
    { name: 'Mew', image: 'nintshop_img/005/003-Mew.png' },
    { name: 'Lucario', image: 'nintshop_img/005/008-Lucario.png' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.startLiveTimer();
    this.simulateViewCount();
    this.simulateChatMessages();
  }

  startLiveTimer(): void {
    let seconds = 0;
    setInterval(() => {
      seconds++;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      this.liveTimer = [hours, minutes, remainingSeconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(":");
    }, 1000);
  }

  startVideoStream() {
    // Sử dụng navigator để truy cập camera và micro
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.localStream = stream;

        // Lấy video element từ DOM
        const videoElement = document.getElementById('localVideo') as HTMLVideoElement;

        // Gán stream vào video element
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });
  }

  // Hàm để ngắt stream khi không cần sử dụng
  stopVideoStream() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = undefined; // Đặt lại localStream thành undefined

      // Ngắt kết nối video
      const videoElement = document.getElementById('localVideo') as HTMLVideoElement;
      if (videoElement) {
        videoElement.srcObject = null; // Ngắt kết nối video
      }
    }
  }

  simulateViewCount(): void {
    setInterval(() => {
      this.viewCount = Math.floor(Math.random() * 1000) + 500;
    }, 5000);
  }

  simulateChatMessages(): void {
    const sampleMessages = [
      "Great stream!",
      "Love the content!",
      "Can you show that again?",
      "Hello from New York!",
      "First time here, loving it!",
    ];

    setInterval(() => {
      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      this.messages.push({
        username: `User${Math.floor(Math.random() * 1000)}`,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        text: randomMessage,
        timestamp: new Date()
      });
      this.scrollToBottom();
    }, 3000);
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatMessages) {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        username: 'You',
        avatar: 'assets/images/your-avatar.jpg',
        text: this.newMessage,
        timestamp: new Date()
      });
      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  toggleChat(): void {
    this.isChatCollapsed = !this.isChatCollapsed;
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

  toggleShowMore(): void{
    this.showMore = !this.showMore
  }
  

  shareStream(): void {
    // Implement share functionality
    console.log('Sharing stream...');
  }

  toggleAudio(): void {
    this.isMuted = !this.isMuted;
    // Implement actual audio muting logic here
  }

  toggleFullscreen(): void {
    // Implement fullscreen toggle logic
    console.log('Toggling fullscreen...');
  }

  openGiftModal(): void {
    this.isGiftModalOpen = true;
  }

  closeGiftModal(): void {
    this.isGiftModalOpen = false;
  }

  openCartModal(): void {
    this.isCartView = true;
  }

  closeCartModal(): void {
    this.isCartView = false;
  }

  sendGift(gift: Gift): void {
    console.log(`Sending gift: ${gift.name}`);
    // Implement gift sending logic
    this.closeGiftModal();
  }

  viewProducts(): void {
    // Implement product viewing logic
    console.log('Viewing products...');
  }
}