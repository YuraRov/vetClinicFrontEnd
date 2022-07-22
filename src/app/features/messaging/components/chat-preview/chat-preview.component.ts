import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/core/models/Chat';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.sass']
})
export class ChatPreviewComponent implements OnInit {
  
  @Input() chat?: Chat;

  constructor(
    private messagingService: MessagingService
  ) 
  {}

  get numberOfUnreadMessages() {
    let result: number = 0;

    if (this.chat?.id != undefined){
      result = this.messagingService
              .getNumberOfUnreadMessages(this.chat.id) ?? 0
    }
    return result;
  }

  ngOnInit(): void {
  }
}
