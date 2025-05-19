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
exports.User = exports.UserType = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../../departments/entities/department.entity");
const chat_user_entity_1 = require("../../chats/entities/chat-user.entity");
const message_entity_1 = require("../../messages/entities/message.entity");
const task_entity_1 = require("../../tasks/entities/task.entity");
var UserType;
(function (UserType) {
    UserType["ADMIN"] = "admin";
    UserType["MANAGER"] = "manager";
    UserType["EMPLOYEE"] = "employee";
})(UserType || (exports.UserType = UserType = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserType,
        default: UserType.EMPLOYEE,
    }),
    __metadata("design:type", String)
], User.prototype, "user_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "logged_in", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "user_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "token_expiration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "token_vk", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "token_google", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.users, { nullable: true }),
    __metadata("design:type", department_entity_1.Department)
], User.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => department_entity_1.Department, (department) => department.manager),
    __metadata("design:type", Array)
], User.prototype, "managedDepartments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_user_entity_1.ChatUser, (chatUser) => chatUser.user),
    __metadata("design:type", Array)
], User.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.user),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.assignedUser),
    __metadata("design:type", Array)
], User.prototype, "tasks", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map