import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

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
    example: 'dellesert@example.com',  
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Тип пользователя: admin, manager, employee. По умолчанию - employee',
    example: 'admin',  
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  user_type: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'Password123!',  
    required: true,
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
