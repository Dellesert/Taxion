import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@WebSocketGateway({ cors: true }) 
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) {} 

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Подключение к конкретному чату
  @SubscribeMessage('joinChat')
  handleJoinChat(@MessageBody() data: { chat_id: number }, @ConnectedSocket() client: Socket) {
    const room = `chat_${data.chat_id}`;
    client.join(room);
    console.log(`Client ${client.id} joined room ${room}`);
    client.emit('joinedChat', { chat_id: data.chat_id, message: 'Connected to chat' });
  }

  // Отключение от чата
  @SubscribeMessage('leaveChat')
  async handleLeaveChat(@MessageBody() data: { chat_id: number }, @ConnectedSocket() client: Socket) {
    const room = `chat_${data.chat_id}`;
    client.leave(room);
    console.log(`Client ${client.id} left room ${room}`);
    client.emit('leftChat', { chat_id: data.chat_id, message: 'Disconnected from chat' });
  }

  // Отправка сообщения в конкретный чат
  @SubscribeMessage('sendMessage')
  @ApiOperation({ summary: 'Send a message to WebSocket clients' })
  async handleMessage(@MessageBody() message: {
    message_text: string;
    user_id: number; text: string; chat_id: number 
}, @ConnectedSocket() client: Socket) {
    const room = `chat_${message.chat_id}`;
    console.log(`Message received in ${room}:`, message);

    await this.messagesService.create(message.chat_id, message.user_id, message.message_text)

    // Отправляем сообщение только пользователям в этом чате
    this.server.to(room).emit('receiveMessage', message);
  }
}
