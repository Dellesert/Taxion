import { User } from '../../users/entities/user.entity';
import { Chat } from './chat.entity';
export declare class ChatUser {
    id: number;
    chat_id: number;
    user_id: number;
    chat: Chat;
    user: User;
}
