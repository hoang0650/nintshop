import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private url = 'https://sale-nest-api.onrender.com'; // Đổi thành địa chỉ WebSocket server của bạn

  constructor() {
    this.socket = io(this.url, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "header value"
      }
    });
  }

  newUser(username: string, position: { x: number, y: number }) {
    this.socket.emit('new-user', { username, position });
  }

  move(position: { x: number, y: number }) {
    this.socket.emit('move', { position });
  }

  getUsers(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('update-users', (users) => {
        observer.next(users);
      });
    });
  }
}
