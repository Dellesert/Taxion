import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByUsername(username: string): Promise<User | undefined>;
    create(userData: Partial<User>): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
    save(user: User): Promise<User>;
}
