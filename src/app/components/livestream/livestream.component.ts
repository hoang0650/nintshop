import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StreamService } from '../../services/stream.service';
@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.css']
})
export class LivestreamComponent implements OnInit, AfterViewInit {
  @ViewChild('chatMessages', { static: false }) chatMessages!: ElementRef;
  liveTimer: string = '00:00:00'; // Initial time for the live stream
  startTime: Date;
  showGiftModal: boolean = false;
  isMobileView: boolean = false;
  localStream: MediaStream | undefined;
  
  messages: string[] = [];
  chatMessage: string = '';
  viewCount: number = 1000;
  showMore: boolean = true;

  constructor(private streamService: StreamService) {
    this.startTime = new Date(); // Store the start time of the live stream
  }

  ngOnInit() {
    // Lắng nghe tin nhắn từ server
    this.streamService.onMessage((msg: string) => {
      this.messages.push(msg);
    });
    // Truy cập camera và micro
    this.startVideoStream();
    // Initialize any necessary logic here
    this.startTimer();
    this.checkViewMode();
    window.addEventListener('resize', () => this.checkViewMode());
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.chatMessage.trim()) {
      this.streamService.sendMessage(this.chatMessage);
      this.startTime
      this.chatMessage = '';
    }
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
    if (this.showMore) {
      setTimeout(() => this.scrollToBottom(), 0);
    }
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

  scrollToBottom() {
    if (this.chatMessages) {
      const chatContainer = this.chatMessages.nativeElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  // Method to update the live timer
  startTimer() {
    setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = currentTime.getTime() - this.startTime.getTime();
      
      const hours = Math.floor(elapsedTime / 1000 / 60 / 60);
      const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
      const seconds = Math.floor((elapsedTime / 1000) % 60);

      this.liveTimer = `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`;
    }, 1000);
  }

  // Method to pad time with leading zeros
  padTime(time: number): string {
    return time < 10 ? '0' + time : time.toString();
  }

  toggleGiftModal(): void {
    this.showGiftModal = !this.showGiftModal;
  }

  checkViewMode(): void {
    this.isMobileView = window.innerWidth <= 768; // Mobile view detection
  }
}