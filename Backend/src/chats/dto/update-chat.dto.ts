import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateChatDto {
    @ApiProperty({
        description: 'Название чата',
        example: 'Dellesert chat',  
        required: true, 
      })
    @IsNotEmpty()
    @IsString()
    name: string;
    
}
