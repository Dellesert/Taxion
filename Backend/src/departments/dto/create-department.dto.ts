import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDepartmenDto {

    @ApiProperty({
        description: 'Имя подразделения',
        example: 'Подразделение №1', 
        required: true,
      })
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty({
        description: 'ID менеджера подразделения',
        example: 10, 
        required: true,
      })
    @IsNotEmpty()
    @IsNumber()
    manager_id: number;
}
