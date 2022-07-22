import { Message } from "./Message";

export class Chat {
    id?: number;
    name?: string;
    interlocutorId?: number;
    picture?: string;
    numberOfUnreadMessages: number = 0;
    lastMessage?: Message;
    messages?: Message[];
}