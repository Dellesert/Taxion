import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    findOne(id: string): Promise<import("./entities/message.entity").Message>;
    create(body: {
        chat_id: number;
        user_id: number;
        message_text: string;
    }): Promise<import("./entities/message.entity").Message>;
    findByChat(chatId: number): Promise<import("./entities/message.entity").Message[]>;
    update(id: number, updateUserDto: UpdateMessageDto): Promise<import("./entities/message.entity").Message>;
    remove(id: number): Promise<import("./entities/message.entity").Message>;
}
