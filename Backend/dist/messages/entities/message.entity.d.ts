import { Chat } from '../../chats/entities/chat.entity';
import { User } from '../../users/entities/user.entity';
export declare class Message {
    id: number;
    chat_id: number;
    user_id: number;
    message_text: string;
    timestamp: Date;
    chat: Chat;
    user: User;
}
