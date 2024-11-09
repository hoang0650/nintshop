import { Component, HostListener, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character';
import { SocketService } from '../../services/socket.service';
interface UserPosition {
  x: number;
  y: number;
}

interface User {
  username: string;
  position: UserPosition;
}
@Component({
  selector: 'app-virtual-office',
  templateUrl: './virtual-office.component.html',
  styleUrl: './virtual-office.component.css'
})
export class VirtualOfficeComponent implements OnInit  {
  username: string | null = null;
  position: UserPosition = { x: 20, y: 20 };
  users: { [key: string]: User } = {}; // Định nghĩa kiểu dữ liệu cho users
  micOn = false;
  videoOn = false;
  inMeetingRoom = false;
  proximityThreshold = 100;
  

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    if (!this.username) {
      this.promptUsername();
    }

    if (this.username) {
      // Đăng ký user mới và gửi vị trí hiện tại
      this.socketService.newUser(this.username, this.position);

      // Nhận thông tin user từ server và cập nhật danh sách
      this.socketService.getUsers().subscribe((users) => {
        this.users = users;
      });
    }
  }

  promptUsername(): void {
    const enteredUsername = prompt('Vui lòng nhập tên của bạn:');
    if (enteredUsername) {
      this.username = enteredUsername;
      localStorage.setItem('username', this.username);
    }
  }

  // Các hàm di chuyển, bật tắt mic, v.v.
  getDistance(elem: HTMLElement): number {
    const character = document.getElementById('character')!.getBoundingClientRect();
    const area = elem.getBoundingClientRect();
    return Math.sqrt(Math.pow(character.left - area.left, 2) + Math.pow(character.top - area.top, 2));
  }

  checkProximity(): void {
    const meetingRoom = document.getElementById('meetingRoom')!;
    this.inMeetingRoom = this.getDistance(meetingRoom) < this.proximityThreshold;

    if (!this.inMeetingRoom) {
      this.micOn = false;
      this.videoOn = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  moveCharacter(event: KeyboardEvent): void {
    const step = 5;
    switch (event.key) {
      case 'ArrowUp':
        this.position.y = Math.max(0, this.position.y - step);
        break;
      case 'ArrowDown':
        this.position.y = Math.min(100, this.position.y + step);
        break;
      case 'ArrowLeft':
        this.position.x = Math.max(0, this.position.x - step);
        break;
      case 'ArrowRight':
        this.position.x = Math.min(100, this.position.x + step);
        break;
    }

    this.checkProximity();
    // Gửi vị trí cập nhật lên server
    this.socketService.move(this.position);
  }

  toggleMic(): void {
    this.micOn = !this.micOn;
  }

  toggleVideo(): void {
    this.videoOn = !this.videoOn;
  }

  openChat(): void {
    alert('Mở cửa sổ chat');
  }

}
