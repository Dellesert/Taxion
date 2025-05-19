import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { UpdateDepartmenDto } from './dto/update-department.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Получить все подразделения' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Получить подразделение по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID подразделения' })
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создать подразделение' })
  @ApiParam({ name: 'id', type: Number, description: 'ID подразделения' })
  @ApiBody({ type: UpdateDepartmenDto, description: 'Данные о подразделении' }) 
  create(@Body() departmentData: Partial<Department>) {
    return this.departmentsService.create(departmentData);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':departmentId/add-user/:userId')
  @ApiOperation({ summary: 'Добавить пользователя в подразделение' })
  @ApiParam({ name: 'departmentId', type: Number, description: 'ID подразделения' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID пользователя' })
  addUser(
    @Param('departmentId') departmentId: number,
    @Param('userId') userId: number,
  ) {
    return this.departmentsService.addUserToDepartment(departmentId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':departmentId/users/:userId')
  @ApiOperation({ summary: 'Удалить пользователя из подразделения' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID пользователя' }) 
  async removeUserFromDepartment(
    @Param('userId') userId: number,
  ) {
    await this.departmentsService.removeUserFromDepartment(userId);
    return { message: `User ${userId} removed from department` };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Обновить информацию о подразделении' })
  @ApiParam({ name: 'id', type: Number, description: 'ID подразделения' })
  @ApiBody({ type: UpdateDepartmenDto, description: 'Данные о подразделении' }) 
  async update(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmenDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить подразделение' })
  @ApiParam({ name: 'id', type: Number, description: 'ID подразделения' })
  remove(@Param('id') id: number) {
      return this.departmentsService.remove(id);
  }
}
    