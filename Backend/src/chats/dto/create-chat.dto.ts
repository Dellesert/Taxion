import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
    @ApiProperty({
        description: 'Название чата',
        example: 'Dellesert Chat',
        required: true,
      })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Id пользователя создавший чат',
        example: 11, 
        required: true,
      })
    @IsNotEmpty()
    @IsString()
    created_by: number;
    
}
