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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async create(title, description, assigned_user_id) {
        const task = this.taskRepository.create({ title, description, assigned_user_id });
        return this.taskRepository.save(task);
    }
    async findAll() {
        return this.taskRepository.find({
            relations: ['assignedUser'],
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        return this.taskRepository.findOne({
            where: { id },
            relations: ['assignedUser'],
        });
    }
    async findByUser(userId) {
        return this.taskRepository.find({
            where: { assigned_user_id: userId },
            relations: ['assignedUser'],
            order: { created_at: 'DESC' },
        });
    }
    async update(id, data) {
        await this.taskRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        return this.taskRepository.delete(id);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map