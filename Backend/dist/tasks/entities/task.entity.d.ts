import { User } from '../../users/entities/user.entity';
export declare class Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    assigned_user_id: number;
    created_at: Date;
    updated_at: Date;
    assignedUser: User;
}
