import { Message } from '../../messages/entities/message.entity';
import { ChatUser } from './chat-user.entity';
export declare class Chat {
    id: number;
    name: string;
    created_by: number;
    created_at: Date;
    messages: Message[];
    participants: ChatUser[];
}
