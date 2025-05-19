import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessagesService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<Message>);
    findOne(id: number): Promise<Message>;
    create(chat_id: number, user_id: number, message_text: string): Promise<Message>;
    findByChat(chat_id: number): Promise<Message[]>;
    update(id: number, dto: UpdateMessageDto): Promise<Message>;
    remove(id: number): Promise<Message>;
}
