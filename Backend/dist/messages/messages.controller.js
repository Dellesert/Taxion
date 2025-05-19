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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const update_message_dto_1 = require("./dto/update-message.dto");
const swagger_1 = require("@nestjs/swagger");
const create_message_dto_1 = require("./dto/create-message.dto");
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    findOne(id) {
        return this.messagesService.findOne(+id);
    }
    async create(body) {
        const { chat_id, user_id, message_text } = body;
        return this.messagesService.create(chat_id, user_id, message_text);
    }
    async findByChat(chatId) {
        return this.messagesService.findByChat(+chatId);
    }
    update(id, updateUserDto) {
        return this.messagesService.update(id, updateUserDto);
    }
    remove(id) {
        return this.messagesService.remove(id);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить сообщение по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID чата' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить сообщение' }),
    (0, swagger_1.ApiBody)({ type: create_message_dto_1.CreateMessageDto, description: 'Данные для создания сообщения' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('chat/:chatId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все сообщения чата' }),
    (0, swagger_1.ApiParam)({ name: 'chatId', type: Number, description: 'ID чата' }),
    __param(0, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "findByChat", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить сообщение' }),
    (0, swagger_1.ApiBody)({ type: update_message_dto_1.UpdateMessageDto, description: 'Данные для обновления сообщения' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID сообщения' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить сообщение по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID сообщения' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "remove", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map