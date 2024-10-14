// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api';
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');
  }

  getUserChats(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/chats`);
  }

  getChatById(chatId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/chat/${chatId}`);
  }

  createChat(isGroupChat: boolean, participants: string[], groupName?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat/create`, { isGroupChat, participants, groupName });
  }

  joinChat(chatId: string): void {
    this.socket.emit('join chat', chatId);
  }

  leaveChat(chatId: string): void {
    this.socket.emit('leave chat', chatId);
  }

  sendMessage(chatId: string, message: any): void {
    this.socket.emit('new message', chatId, message);
  }

  onMessageReceived(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message received', (message: any) => {
        observer.next(message);
      });
    });
  }
}