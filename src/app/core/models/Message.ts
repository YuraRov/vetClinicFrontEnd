import { ResourceModel } from "./ResourceModel";

export class Message extends ResourceModel<Message>{
    text?: string;
    receiverId?: number
    sentAt?: Date;
    senderId?: number;
    senderName?: string;
    chatRoomId?: number

    constructor(model?: Partial<Message>) {
        super(model);
    }
}