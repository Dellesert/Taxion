import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
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
        example: 'Сходить купить кофе для начальства',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Описание',
        example: 'Сходить в кофейню и купить кофе для своего начальства, чтобы оно было добрым!',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
