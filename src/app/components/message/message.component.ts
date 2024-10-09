import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  messages: any[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.messages$.subscribe(messages => this.messages = messages);
  }

  removeMessage(text: string) {
    this.messageService.removeMessage(text);
  }
}
