import { Controller, Get, Post, Param, Body, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Get()
  @ApiOperation({ summary: 'Получить все чаты' })
  findAll() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить чат по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @Get(':id/users')
  @ApiOperation({ summary: 'Получить всех пользоввателей в конкретном чате' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  async getUsersInChat(@Param('id', ParseIntPipe) chatId: number) {
    return this.chatsService.findUsersInChat(chatId);
  }

  @Post()
  @ApiOperation({ summary: 'Создать чат' })
  @ApiBody({ type: CreateChatDto, description: 'Данные для создания чата' })
  create(@Body() body: { name: string, created_by: number }) {
    return this.chatsService.create(body.name, body.created_by);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные чата' })
  @ApiBody({ type: UpdateChatDto, description: 'Дата для обновления чата' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  update(@Param('id') id: number, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }


  @Post(':chatId/users')
  @ApiOperation({ summary: 'Добавить пользователя в конкретный чат' })
  @ApiParam({ name: 'chatId', type: Number, description: 'ID чата' })
  @ApiParam({ name: 'user_id', type: Number, description: 'ID пользователя' })
  addUserToChat(
    @Param('chatId') chatId: number,
    @Body('user_id') userId: number,
  ) {
    return this.chatsService.addUserToChat(chatId, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить чат' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  remove(@Param('id') id: number) {
    return this.chatsService.remove(id);
  }

  @Delete(':chatId/users/:userId')
  @ApiOperation({ summary: 'Удалить конкретного пользователя из чата' })
  @ApiParam({ name: 'chatId', type: Number, description: 'ID чата' })
  @ApiParam({ name: 'user_id', type: Number, description: 'ID пользователя' })
  async removeUserFromChat(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.chatsService.removeUserFromChat(chatId, userId);
  }

}
