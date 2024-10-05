import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://sale-nest-api.onrender.com', {
      transports: ['websocket', 'polling'], // Cung cấp các phương thức kết nối
      withCredentials: true, // Cho phép gửi thông tin xác thực (nếu cần)
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  onMessage(callback: (message: string) => void): void {
    this.socket.on('message', callback);
  }
  
  // Ngắt kết nối socket
  disconnect(): void {
    this.socket.disconnect();
  }
}
