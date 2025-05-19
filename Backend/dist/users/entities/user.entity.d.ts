import { Department } from '../../departments/entities/department.entity';
import { ChatUser } from 'src/chats/entities/chat-user.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Task } from 'src/tasks/entities/task.entity';
export declare enum UserType {
    ADMIN = "admin",
    MANAGER = "manager",
    EMPLOYEE = "employee"
}
export declare class User {
    id: number;
    email: string;
    username: string;
    user_type: UserType;
    password: string;
    logged_in: boolean;
    user_token: string;
    token_expiration: Date;
    token_vk: string;
    token_google: string;
    department: Department;
    managedDepartments: Department[];
    chats: ChatUser[];
    messages: Message[];
    tasks: Task[];
}
