import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { UpdateDepartmenDto } from './dto/update-department.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll() {
    return this.departmentRepository.find({
      relations: ['users'],
    });
  }

  async findOne(id: number) {
    return this.departmentRepository.findOne({
      where: { department_id: id },
      relations: ['users'],
    });
  }

  create(departmentData: Partial<Department>) {
    const department = this.departmentRepository.create(departmentData);
    return this.departmentRepository.save(department);
  }

  async addUserToDepartment(departmentId: number, userId: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { department_id: departmentId },
      relations: ['users'],
    });

    if (!department) {
      throw new NotFoundException(`Отдел с ID ${departmentId} не найден`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
    }

    department.users.push(user);
    return this.departmentRepository.save(department);
  }

  async removeUserFromDepartment(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['department'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.department = null;
    await this.userRepository.save(user);
  }

  update(id: number, dto: UpdateDepartmenDto) {
    return this.departmentRepository.update(id, dto);
  }

  remove(id: number) {
    return this.departmentRepository.delete(id);
  }
}
