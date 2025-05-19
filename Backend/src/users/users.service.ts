import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({ relations: ['department'] });
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['department'] });
    if (!user) {
      throw new NotFoundException(`Пользователь с id ${id} не найден`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['department'],
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return user;
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
