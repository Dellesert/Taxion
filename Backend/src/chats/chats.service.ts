import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { ChatUser } from './entities/chat-user.entity';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatUser)
    private readonly chatUserRepository: Repository<ChatUser>
  ) {}

  findAll() {
    return this.chatRepository.find({ relations: ['messages'] });
  }

  findOne(id: number) {
    return this.chatRepository.findOne({ where: { id }, relations: ['messages'] });
  }

  async findUsersInChat(chatId: number) {
    return this.chatUserRepository.find({
      where: { chat_id: chatId },
      relations: ['user'],
    });
  }

  async create(name: string, created_by: number) {
    const chat = this.chatRepository.create({ name, created_by });
    return this.chatRepository.save(chat);
  }
  
  async addUserToChat(chatId: number, userId: number) {
    const chatUser = this.chatUserRepository.create({ chat_id: chatId, user_id: userId });
    return this.chatUserRepository.save(chatUser);
  }

  async update(id: number, dto: UpdateChatDto): Promise<Chat> {
    await this.chatRepository.update(id, dto);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async remove(id: number): Promise<Chat> {
    const user = await this.findOne(id);
    await this.chatRepository.remove(user);
    return user;
  }

  async removeUserFromChat(chatId: number, userId: number) {
    const chatUser = await this.chatUserRepository.findOne({
      where: { chat_id: chatId, user_id: userId },
    });
  
    if (!chatUser) {
      throw new Error('Пользователь не найден в чате');
    }
  
    await this.chatUserRepository.remove(chatUser);
    return { message: 'Пользователь удален из чата' };
  }
  
  
}
