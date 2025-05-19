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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("./entities/chat.entity");
const chat_user_entity_1 = require("./entities/chat-user.entity");
let ChatsService = class ChatsService {
    constructor(chatRepository, chatUserRepository) {
        this.chatRepository = chatRepository;
        this.chatUserRepository = chatUserRepository;
    }
    findAll() {
        return this.chatRepository.find({ relations: ['messages'] });
    }
    findOne(id) {
        return this.chatRepository.findOne({ where: { id }, relations: ['messages'] });
    }
    async findUsersInChat(chatId) {
        return this.chatUserRepository.find({
            where: { chat_id: chatId },
            relations: ['user'],
        });
    }
    async create(name, created_by) {
        const chat = this.chatRepository.create({ name, created_by });
        return this.chatRepository.save(chat);
    }
    async addUserToChat(chatId, userId) {
        const chatUser = this.chatUserRepository.create({ chat_id: chatId, user_id: userId });
        return this.chatUserRepository.save(chatUser);
    }
    async update(id, dto) {
        await this.chatRepository.update(id, dto);
        const updatedUser = await this.findOne(id);
        return updatedUser;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.chatRepository.remove(user);
        return user;
    }
    async removeUserFromChat(chatId, userId) {
        const chatUser = await this.chatUserRepository.findOne({
            where: { chat_id: chatId, user_id: userId },
        });
        if (!chatUser) {
            throw new Error('Пользователь не найден в чате');
        }
        await this.chatUserRepository.remove(chatUser);
        return { message: 'Пользователь удален из чата' };
    }
};
exports.ChatsService = ChatsService;
exports.ChatsService = ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __param(1, (0, typeorm_1.InjectRepository)(chat_user_entity_1.ChatUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatsService);
//# sourceMappingURL=chats.service.js.map