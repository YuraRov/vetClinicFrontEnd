import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder} from "@microsoft/signalr"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { Chat } from 'src/app/core/models/Chat';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { ResourceService } from 'src/app/core/services/resourceService/resource.service';
import { Message } from 'src/app/core/models/Message';


@Injectable({
  providedIn: 'root'
})
export class MessagingService{

  private hubConnection: HubConnection;

  private baseUrl: string = 'https://localhost:5001'
  private hubUrl: string = `${this.baseUrl}/hubs/messages?access_token=${this.authService.getAccessToken()}`;
  private messagesApiUrl: string = `${this.baseUrl}/api/messages`;
  private chatsApiUrl: string = `${this.baseUrl}/api/chats`;
  private unreadMessagesCount: number = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public unreadMessageRegistry: Map<number, Message[]> = new Map();
  public getMessage$ : Subject<Message> = new Subject<Message>();

  constructor(
    private http: HttpClient,
    private authService: AuthService)
  {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .build();
  }

  public connectToSignalRServer(): void {
    this.hubConnection
      .start()
      .then(() => console.log('Connection has been established'))
      .catch(err => this.handleError('Connect to SignalR server', err));

    this.listenMessages();
  }

  public get numberOfUnreadMessages(){
    return this.unreadMessagesCount;
  }

  public getNumberOfUnreadMessages(chatId: number) {
    return this.unreadMessageRegistry.get(chatId)?.length;
  }

  public getUnreadMessagesInChat(chatId: number) {
    return this.unreadMessageRegistry.get(chatId);
  }

  public getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.chatsApiUrl).pipe(
      catchError(err => this.handleError('get chats', err))
    );
  }

  public getUnreadMessages(): Observable<Message[]> {
    const url = `${this.messagesApiUrl}/unread`;
    return this.http.get<Message[]>(url).pipe(
      tap(messages => this.saveRangeToRegistry(messages)),
      catchError(err => this.handleError('Get unread messages', err))
    )
  }

  public getMessagesInChatRoom(chaRoomId: number, skip: number, take: number) : Observable<Message[]>{
    const url: string = `${this.messagesApiUrl}/${chaRoomId}/${skip}/${take}`;
    return this.http.get<Message[]>(url)
      .pipe(
        catchError(err => this.handleError(`Get messages in chat room #${chaRoomId}`, err)),
      );
  }

  public sendMessage(message: Message) : Observable<Message> {
    return this.http.post<Message>(this.messagesApiUrl, message, this.httpOptions)
      .pipe(
        catchError(err => this.handleError('Send message', err))
      );
  }

  public readMessage(message: Message): Observable<void> {
    const url = `${this.messagesApiUrl}/read/${message.id}`;
    return this.http.post<void>(url, this.httpOptions).pipe(
      catchError(err => this.handleError(`Read message #${message.id}`, err)),
      // remove from unread messages registry
      tap(_ => this.removeFromRegistry(message))
    );
  }

  private listenMessages(): void {
    this.hubConnection.on('getMessage', (message) => {
      this.saveOneToRegistry(message);
      this.getMessage$.next(message);
    });
  }

  private saveRangeToRegistry(messages: Message[]): void {
    messages.forEach(m => this.saveOneToRegistry(m))
  }
  
  private saveOneToRegistry(message: Message): void {
    this.unreadMessagesCount++;
    if(this.unreadMessageRegistry.has(message.chatRoomId!)) {
      this.unreadMessageRegistry.get(message.chatRoomId!)?.push(message);
    }
    else {
      let unreadMessages: Message[] = [message];
      this.unreadMessageRegistry.set(message.chatRoomId!, unreadMessages);
    }
  }

  private removeFromRegistry(message: Message): void {
    this.unreadMessagesCount--;
    let unreadMessages = this.unreadMessageRegistry.get(message.chatRoomId!);
    if (unreadMessages){
      unreadMessages = unreadMessages.filter(m => m.id != message.id);
      this.unreadMessageRegistry.set(message.chatRoomId!, unreadMessages);
    }
  }

  private handleError(action: string, err: any){
    console.log(`Error while trying to ${action}. ${err}`);
    return throwError(err);
  }
}
