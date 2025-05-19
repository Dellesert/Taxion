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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("./departments.service");
const update_department_dto_1 = require("./dto/update-department.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DepartmentsController = class DepartmentsController {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    findAll() {
        return this.departmentsService.findAll();
    }
    findOne(id) {
        return this.departmentsService.findOne(+id);
    }
    create(departmentData) {
        return this.departmentsService.create(departmentData);
    }
    addUser(departmentId, userId) {
        return this.departmentsService.addUserToDepartment(departmentId, userId);
    }
    async removeUserFromDepartment(userId) {
        await this.departmentsService.removeUserFromDepartment(userId);
        return { message: `User ${userId} removed from department` };
    }
    async update(id, updateDepartmentDto) {
        return this.departmentsService.update(id, updateDepartmentDto);
    }
    remove(id) {
        return this.departmentsService.remove(id);
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все подразделения' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить подразделение по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID подразделения' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать подразделение' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID подразделения' }),
    (0, swagger_1.ApiBody)({ type: update_department_dto_1.UpdateDepartmenDto, description: 'Данные о подразделении' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':departmentId/add-user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить пользователя в подразделение' }),
    (0, swagger_1.ApiParam)({ name: 'departmentId', type: Number, description: 'ID подразделения' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'ID пользователя' }),
    __param(0, (0, common_1.Param)('departmentId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "addUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':departmentId/users/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить пользователя из подразделения' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'ID пользователя' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "removeUserFromDepartment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить информацию о подразделении' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID подразделения' }),
    (0, swagger_1.ApiBody)({ type: update_department_dto_1.UpdateDepartmenDto, description: 'Данные о подразделении' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_department_dto_1.UpdateDepartmenDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить подразделение' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID подразделения' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "remove", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, common_1.Controller)('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map