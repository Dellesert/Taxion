import { Controller, Get, Param, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('username/:username')
  @ApiOperation({ summary: 'Получить пользовавтеля по username' })
  @ApiParam({ name: 'username', type: String, description: 'Username пользователя' })
  async findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Обновить информацию о пользователе' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя для обновления' })
  @ApiBody({ type: UpdateUserDto, description: 'Данные пользоавтеля для обновления' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  async remove(@Param('id') id: number) {
      return this.usersService.remove(id);
  }
}
