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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatUser = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const chat_entity_1 = require("./chat.entity");
let ChatUser = class ChatUser {
};
exports.ChatUser = ChatUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChatUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatUser.prototype, "chat_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatUser.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chat_entity_1.Chat, (chat) => chat.participants, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chat_id' }),
    __metadata("design:type", chat_entity_1.Chat)
], ChatUser.prototype, "chat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.chats, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ChatUser.prototype, "user", void 0);
exports.ChatUser = ChatUser = __decorate([
    (0, typeorm_1.Entity)('chat_users')
], ChatUser);
//# sourceMappingURL=chat-user.entity.js.map