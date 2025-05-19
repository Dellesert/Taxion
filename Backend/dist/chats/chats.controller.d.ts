import { ChatsService } from './chats.service';
import { UpdateChatDto } from './dto/update-chat.dto';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    findAll(): Promise<import("./entities/chat.entity").Chat[]>;
    findOne(id: string): Promise<import("./entities/chat.entity").Chat>;
    getUsersInChat(chatId: number): Promise<import("./entities/chat-user.entity").ChatUser[]>;
    create(body: {
        name: string;
        created_by: number;
    }): Promise<import("./entities/chat.entity").Chat>;
    update(id: number, updateChatDto: UpdateChatDto): Promise<import("./entities/chat.entity").Chat>;
    addUserToChat(chatId: number, userId: number): Promise<import("./entities/chat-user.entity").ChatUser>;
    remove(id: number): Promise<import("./entities/chat.entity").Chat>;
    removeUserFromChat(chatId: number, userId: number): Promise<{
        message: string;
    }>;
}
