import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Добавить задачу' })
  @ApiBody({ type: CreateTaskDto, description: 'Данные для создания задачи' })
  create(@Body() body: { title: string, description?: string, assigned_user_id?: number }) {
    const { title, description, assigned_user_id } = body;
    return this.tasksService.create(title, description, assigned_user_id);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все задачи' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить задачу по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID задачи' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Найти задачи по ID пользователя' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID пользователя' })
  findByUser(@Param('userId') userId: number) {
    return this.tasksService.findByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить информацию о задачи' })
  @ApiBody({ type: UpdateTaskDto, description: 'Данные для обновления задачи' })
  @ApiParam({ name: 'id', type: Number, description: 'ID задачи' })
  update(@Param('id') id: string, @Body() body: Partial<Task>) {
    return this.tasksService.update(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить задачу по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID задачи' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
