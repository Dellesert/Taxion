"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const typeorm_config_1 = require("./typeorm.config");
const departments_module_1 = require("./departments/departments.module");
const chats_module_1 = require("./chats/chats.module");
const messages_module_1 = require("./messages/messages.module");
const chat_gateway_1 = require("./chat/chat.gateway");
const tasks_module_1 = require("./tasks/tasks.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
            users_module_1.UsersModule,
            departments_module_1.DepartmentsModule,
            chats_module_1.ChatsModule,
            messages_module_1.MessagesModule,
            tasks_module_1.TasksModule,
            auth_module_1.AuthModule
        ],
        providers: [chat_gateway_1.ChatGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map