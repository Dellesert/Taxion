import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './typeorm.config';
import { DepartmentsModule } from './departments/departments.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './chat/chat.gateway';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    DepartmentsModule,
    ChatsModule,
    MessagesModule,
    TasksModule,
    AuthModule
  ],
  providers: [ChatGateway],
})
export class AppModule {}
