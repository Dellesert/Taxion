import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateMessageDto {
    @ApiProperty({
        description: 'Пример текстового сообщения',
        example: 'Добрый вечер!',
        required: true,
      })
    @IsNotEmpty()
    @IsString()
    message_text: string;
}
