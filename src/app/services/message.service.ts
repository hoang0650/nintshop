import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  type: 'success' | 'danger' | 'warning';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  addMessage(type: 'success' | 'danger' | 'warning', text: string) {
    const messages = this.messagesSubject.value;
    messages.push({ type, text });
    this.messagesSubject.next(messages);
    
    // Auto remove after 5 seconds
    setTimeout(() => this.removeMessage(text), 1000);
  }

  removeMessage(text: string) {
    const messages = this.messagesSubject.value.filter(message => message.text !== text);
    this.messagesSubject.next(messages);
  }
}
