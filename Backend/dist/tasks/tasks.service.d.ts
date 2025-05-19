import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
export declare class TasksService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    create(title: string, description: string, assigned_user_id?: number): Promise<Task>;
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    findByUser(userId: number): Promise<Task[]>;
    update(id: number, data: Partial<Task>): Promise<Task>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
