import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(body: {
        title: string;
        description?: string;
        assigned_user_id?: number;
    }): Promise<Task>;
    findAll(): Promise<Task[]>;
    findOne(id: string): Promise<Task>;
    findByUser(userId: number): Promise<Task[]>;
    update(id: string, body: Partial<Task>): Promise<Task>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
