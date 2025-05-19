import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findOne(id: number) {
    return this.messageRepository.findOne({
      where: { id: id }
    });
  }

  async create(chat_id: number, user_id: number, message_text: string) {
    console.log(chat_id,user_id,message_text)
    const message = this.messageRepository.create({ chat_id, user_id, message_text });
    return await this.messageRepository.save(message);
  }

  async findByChat(chat_id: number) {
    return this.messageRepository.find({
      where: { chat_id },
      relations: ['user'],
      order: { timestamp: 'ASC' },
    });
  }

  async update(id: number, dto: UpdateMessageDto): Promise<Message> {
    await this.messageRepository.update(id, dto);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async remove(id: number): Promise<Message> {
    const message = await this.findOne(id);
    await this.messageRepository.remove(message);
    return message;
  }

}
