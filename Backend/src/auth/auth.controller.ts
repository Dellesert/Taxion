import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({
    description: 'Данные пользователя при регистрации',
    type: CreateUserDto,
  })
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.authService.register(createUserDto.username, createUserDto.email, createUserDto.password);
  }

  @ApiOperation({ summary: 'Вход для зарегистрированного пользователя' })
  @ApiBody({
    description: 'Данные для входа',
    type: CreateUserDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
