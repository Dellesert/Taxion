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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        const users = await this.userRepository.find({ relations: ['department'] });
        return users;
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['department'] });
        if (!user) {
            throw new common_1.NotFoundException(`Пользователь с id ${id} не найден`);
        }
        return user;
    }
    async findByUsername(username) {
        return this.userRepository.findOne({
            where: { username },
            relations: ['department'],
        });
    }
    async create(userData) {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }
    async update(id, updateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.findOne(id);
        return updatedUser;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
        return user;
    }
    async save(user) {
        return this.userRepository.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map