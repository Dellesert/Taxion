import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(title: string, description: string, assigned_user_id?: number) {
    const task = this.taskRepository.create({ title, description, assigned_user_id });
    return this.taskRepository.save(task);
  }

  async findAll() {
    return this.taskRepository.find({
      relations: ['assignedUser'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['assignedUser'],
    });
  }

  async findByUser(userId: number) {
    return this.taskRepository.find({
      where: { assigned_user_id: userId },
      relations: ['assignedUser'],
      order: { created_at: 'DESC' },
    });
  }

  async update(id: number, data: Partial<Task>) {
    await this.taskRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
