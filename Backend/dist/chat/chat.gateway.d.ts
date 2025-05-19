import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinChat(data: {
        chat_id: number;
    }, client: Socket): void;
    handleLeaveChat(data: {
        chat_id: number;
    }, client: Socket): Promise<void>;
    handleMessage(message: {
        message_text: string;
        user_id: number;
        text: string;
        chat_id: number;
    }, client: Socket): Promise<void>;
}
