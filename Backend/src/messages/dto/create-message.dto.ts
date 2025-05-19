import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'ID чата',
    example: 11,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chat_id: number;

  @ApiProperty({
    description: 'ID пользователя',
    example: 11,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  user_id: number;

  @ApiProperty({
    description: 'Пример текстового сообщения',
    example: 'Добрый день!',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  message_text: string;
}
