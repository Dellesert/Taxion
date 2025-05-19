import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { ChatUser } from './entities/chat-user.entity';
import { UpdateChatDto } from './dto/update-chat.dto';
export declare class ChatsService {
    private readonly chatRepository;
    private readonly chatUserRepository;
    constructor(chatRepository: Repository<Chat>, chatUserRepository: Repository<ChatUser>);
    findAll(): Promise<Chat[]>;
    findOne(id: number): Promise<Chat>;
    findUsersInChat(chatId: number): Promise<ChatUser[]>;
    create(name: string, created_by: number): Promise<Chat>;
    addUserToChat(chatId: number, userId: number): Promise<ChatUser>;
    update(id: number, dto: UpdateChatDto): Promise<Chat>;
    remove(id: number): Promise<Chat>;
    removeUserFromChat(chatId: number, userId: number): Promise<{
        message: string;
    }>;
}
