"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messages_service_1 = require("../messages/messages.service");
const swagger_1 = require("@nestjs/swagger");
let ChatGateway = class ChatGateway {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleJoinChat(data, client) {
        const room = `chat_${data.chat_id}`;
        client.join(room);
        console.log(`Client ${client.id} joined room ${room}`);
        client.emit('joinedChat', { chat_id: data.chat_id, message: 'Connected to chat' });
    }
    async handleLeaveChat(data, client) {
        const room = `chat_${data.chat_id}`;
        client.leave(room);
        console.log(`Client ${client.id} left room ${room}`);
        client.emit('leftChat', { chat_id: data.chat_id, message: 'Disconnected from chat' });
    }
    async handleMessage(message, client) {
        const room = `chat_${message.chat_id}`;
        console.log(`Message received in ${room}:`, message);
        await this.messagesService.create(message.chat_id, message.user_id, message.message_text);
        this.server.to(room).emit('receiveMessage', message);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message to WebSocket clients' }),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, swagger_1.ApiTags)('chat'),
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map