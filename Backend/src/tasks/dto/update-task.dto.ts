import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
    @ApiProperty({
        description: 'ID пользователя',
        example: 11,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    assigned_user_id: number;

    @ApiProperty({
        description: 'Назвавние задачи',
        example: 'Подготовить документы',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Описание',
        example: 'Сделать отчет и подготовить документы за квартал, сдать вовремя',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
