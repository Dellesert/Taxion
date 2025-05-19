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
exports.UpdateUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../entities/user.entity");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Имя пользователя',
        example: 'Dellesert',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email пользователя',
        example: 'Dellesert@example.com',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Тип пользователя: admin, manager, employee',
        example: 'admin',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_entity_1.UserType),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "user_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Пароль пользователя',
        example: 'Password123!',
        required: true,
        minLength: 8,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Статус входа',
        example: true,
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "logged_in", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Пользовательский токен',
        example: 'uiod1h29812yhdjwisdaj9yed18927y29d1h12d',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "user_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Срок жизни токена в часах',
        example: '24h',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "token_expiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'VK токен пользователя',
        example: 'ikehndbf19382udh192d30djeidj',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "token_vk", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Google токен пользоввателя',
        example: 'wefkweiojfhoihj09u9jjlqkjqw',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "token_google", void 0);
//# sourceMappingURL=update-user.dto.js.map