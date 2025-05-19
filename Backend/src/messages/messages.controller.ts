import { Controller, Post, Get, Body, Param, Delete, Patch } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Получить сообщение по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID чата' })
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Добавить сообщение' })
  @ApiBody({ type: CreateMessageDto, description: 'Данные для создания сообщения' })
  async create(@Body() body: { chat_id: number, user_id: number, message_text: string }) {
    const { chat_id, user_id, message_text } = body;
    return this.messagesService.create(chat_id, user_id, message_text);
  }

  @Get('chat/:chatId')
  @ApiOperation({ summary: 'Получить все сообщения чата' })
  @ApiParam({ name: 'chatId', type: Number, description: 'ID чата' })
  async findByChat(@Param('chatId') chatId: number) {
    return this.messagesService.findByChat(+chatId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить сообщение' })
  @ApiBody({ type: UpdateMessageDto, description: 'Данные для обновления сообщения' })
  @ApiParam({ name: 'id', type: Number, description: 'ID сообщения' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateMessageDto) {
      return this.messagesService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить сообщение по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID сообщения' })
  remove(@Param('id') id: number) {
      return this.messagesService.remove(id);
  }
}
