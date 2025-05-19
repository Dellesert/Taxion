import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../entities/user.entity';

export class UpdateUserDto {

    @ApiProperty({
      description: 'Имя пользователя',
      example: 'Dellesert',
      required: true,
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
      description: 'Email пользователя',
      example: 'Dellesert@example.com',
      required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ 
      description: 'Тип пользователя: admin, manager, employee',
      example: 'admin',
      required: false 
    })
    @IsOptional()
    @IsEnum(UserType)
    user_type?: UserType;

    @ApiProperty({
      description: 'Пароль пользователя',
      example: 'Password123!',
      required: true,
      minLength: 8,
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
      description: 'Статус входа',
      example: true,
      required: true,
    })
    @IsString()
    logged_in: boolean;

    @ApiProperty({
      description: 'Пользовательский токен',
      example: 'uiod1h29812yhdjwisdaj9yed18927y29d1h12d',
      required: true,
    })
    @IsString()
    user_token: string;

    @ApiProperty({
      description: 'Срок жизни токена в часах',
      example: '24h',
      required: true,
    })
    @IsString()
    token_expiration: string;

    @ApiProperty({
      description: 'VK токен пользователя',
      example: 'ikehndbf19382udh192d30djeidj',
      required: true,
    })
    @IsString()
    token_vk: string;

    @ApiProperty({
      description: 'Google токен пользоввателя',
      example: 'wefkweiojfhoihj09u9jjlqkjqw',
      required: true,
    })
    @IsString()
    token_google: string;

}


