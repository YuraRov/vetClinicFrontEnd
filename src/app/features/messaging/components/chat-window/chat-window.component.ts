import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { Chat } from 'src/app/core/models/Chat';
import { Message } from 'src/app/core/models/Message';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass']
})
export class ChatWindowComponent implements OnInit {

  private messagesToTake: number = 20;

  @Input() chat?: Chat;
  @ViewChild('messagesContainer') containerRef?: ElementRef;

  skip: number = 0;
  leftUntilLoad: number = 0;
  hasReadToEnd: boolean = false;
  scrollY: number = 0;

  messageText: string = '';
   
  constructor(
    private messagingService: MessagingService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void 
  {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.chat != undefined){
      // load messages from unread messages registry if they exist
      this.chat.messages = [];
      let messages = this.messagingService.unreadMessageRegistry.get(this.chat.id!)
      if (messages){
        this.chat.messages = this.chat.messages.concat(messages);
      }
      this.skip = messages?.length ?? 0;
      
      // load last 20 read messages
      this.loadMessages();
    }
  } 

  onSendMessage(messageText: string) {
    if (this.chat != undefined && messageText.trim()){
      var messageSend: Message = new Message({
        text: messageText,
        receiverId: this.chat.interlocutorId
      });
      this.messagingService.sendMessage(messageSend).subscribe( response => {
        this.messageText = '';
        let message = new Message ({
          text: messageText, 
          senderId: this.authService.getUserId(),
          chatRoomId: this.chat?.id!
        });
        this.chat?.messages?.push(message);
      })
    }
  }

  get scrollHeight(): number {
    return this.containerRef?.nativeElement.scrollHeight ?? 0;
  }

  get currentScrollTop(): number {
    return this.containerRef?.nativeElement.scrollTop ?? 0;
  }

  get scrollTop(): number {
    return this.scrollHeight - this.clientHeight - this.scrollY;
  }

  get clientHeight(): number {
    return this.containerRef?.nativeElement.clientHeight ?? 0;
  }

  onReadMessage(message: Message){
    var unreadMessages = this.messagingService.unreadMessageRegistry.get(this.chat?.id!);
    if (unreadMessages?.map(m => m.id).includes(message.id)){
      this.messagingService.readMessage(message).subscribe();
    }
    else {
      if(this.chat?.messages 
          && message.id === this.chat.messages[0].id 
          && !this.hasReadToEnd) {
        this.loadMessages();
      }
    }
  }
  
  private loadMessages() {
    if (this.chat?.id != undefined){
      this.messagingService.getMessagesInChatRoom(this.chat.id, this.skip, this.messagesToTake).subscribe(messages => {
        const length = messages.length;
        this.scrollY = this.scrollHeight - this.currentScrollTop - this.clientHeight;
        if (length != 0){
          this.chat?.messages?.unshift(...messages.reverse());
        }

        if (length < this.messagesToTake)
          this.hasReadToEnd = true;
        
        this.skip += length;
      });
    }
  }

  private scrollToBottom() {
    this.containerRef?.nativeElement.scrollIntoView(false);
  }
}
