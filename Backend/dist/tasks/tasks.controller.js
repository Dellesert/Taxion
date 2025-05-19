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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const swagger_1 = require("@nestjs/swagger");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    create(body) {
        const { title, description, assigned_user_id } = body;
        return this.tasksService.create(title, description, assigned_user_id);
    }
    findAll() {
        return this.tasksService.findAll();
    }
    findOne(id) {
        return this.tasksService.findOne(+id);
    }
    findByUser(userId) {
        return this.tasksService.findByUser(userId);
    }
    update(id, body) {
        return this.tasksService.update(+id, body);
    }
    remove(id) {
        return this.tasksService.remove(+id);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить задачу' }),
    (0, swagger_1.ApiBody)({ type: create_task_dto_1.CreateTaskDto, description: 'Данные для создания задачи' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все задачи' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить задачу по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID задачи' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Найти задачи по ID пользователя' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'ID пользователя' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить информацию о задачи' }),
    (0, swagger_1.ApiBody)({ type: update_task_dto_1.UpdateTaskDto, description: 'Данные для обновления задачи' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID задачи' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить задачу по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID задачи' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "remove", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map