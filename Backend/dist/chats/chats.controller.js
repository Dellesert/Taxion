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
exports.ChatsController = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const update_chat_dto_1 = require("./dto/update-chat.dto");
const swagger_1 = require("@nestjs/swagger");
const create_chat_dto_1 = require("./dto/create-chat.dto");
let ChatsController = class ChatsController {
    constructor(chatsService) {
        this.chatsService = chatsService;
    }
    findAll() {
        return this.chatsService.findAll();
    }
    findOne(id) {
        return this.chatsService.findOne(+id);
    }
    async getUsersInChat(chatId) {
        return this.chatsService.findUsersInChat(chatId);
    }
    create(body) {
        return this.chatsService.create(body.name, body.created_by);
    }
    update(id, updateChatDto) {
        return this.chatsService.update(id, updateChatDto);
    }
    addUserToChat(chatId, userId) {
        return this.chatsService.addUserToChat(chatId, userId);
    }
    remove(id) {
        return this.chatsService.remove(id);
    }
    async removeUserFromChat(chatId, userId) {
        return this.chatsService.removeUserFromChat(chatId, userId);
    }
};
exports.ChatsController = ChatsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все чаты' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить чат по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID чата' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/users'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить всех пользоввателей в конкретном чате' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID чата' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getUsersInChat", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать чат' }),
    (0, swagger_1.ApiBody)({ type: create_chat_dto_1.CreateChatDto, description: 'Данные для создания чата' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить данные чата' }),
    (0, swagger_1.ApiBody)({ type: update_chat_dto_1.UpdateChatDto, description: 'Дата для обновления чата' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID чата' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_chat_dto_1.UpdateChatDto]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':chatId/users'),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить пользователя в конкретный чат' }),
    (0, swagger_1.ApiParam)({ name: 'chatId', type: Number, description: 'ID чата' }),
    (0, swagger_1.ApiParam)({ name: 'user_id', type: Number, description: 'ID пользователя' }),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, common_1.Body)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "addUserToChat", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить чат' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID чата' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':chatId/users/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить конкретного пользователя из чата' }),
    (0, swagger_1.ApiParam)({ name: 'chatId', type: Number, description: 'ID чата' }),
    (0, swagger_1.ApiParam)({ name: 'user_id', type: Number, description: 'ID пользователя' }),
    __param(0, (0, common_1.Param)('chatId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "removeUserFromChat", null);
exports.ChatsController = ChatsController = __decorate([
    (0, common_1.Controller)('chats'),
    __metadata("design:paramtypes", [chats_service_1.ChatsService])
], ChatsController);
//# sourceMappingURL=chats.controller.js.map