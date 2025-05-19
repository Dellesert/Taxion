import { User } from '../../users/entities/user.entity';
export declare class Department {
    department_id: number;
    name: string;
    manager_id: number;
    manager: User;
    users: User[];
}
