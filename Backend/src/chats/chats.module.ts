import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './entities/chat.entity';
import { ChatUser } from './entities/chat-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatUser])],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
