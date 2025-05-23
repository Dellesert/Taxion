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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("./entities/department.entity");
const user_entity_1 = require("../users/entities/user.entity");
let DepartmentsService = class DepartmentsService {
    constructor(departmentRepository, userRepository) {
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }
    async findAll() {
        return this.departmentRepository.find({
            relations: ['users'],
        });
    }
    async findOne(id) {
        return this.departmentRepository.findOne({
            where: { department_id: id },
            relations: ['users'],
        });
    }
    create(departmentData) {
        const department = this.departmentRepository.create(departmentData);
        return this.departmentRepository.save(department);
    }
    async addUserToDepartment(departmentId, userId) {
        const department = await this.departmentRepository.findOne({
            where: { department_id: departmentId },
            relations: ['users'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Отдел с ID ${departmentId} не найден`);
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`Пользователь с ID ${userId} не найден`);
        }
        department.users.push(user);
        return this.departmentRepository.save(department);
    }
    async removeUserFromDepartment(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['department'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        user.department = null;
        await this.userRepository.save(user);
    }
    update(id, dto) {
        return this.departmentRepository.update(id, dto);
    }
    remove(id) {
        return this.departmentRepository.delete(id);
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map