import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { UpdateDepartmenDto } from './dto/update-department.dto';
import { User } from 'src/users/entities/user.entity';
export declare class DepartmentsService {
    private readonly departmentRepository;
    private readonly userRepository;
    constructor(departmentRepository: Repository<Department>, userRepository: Repository<User>);
    findAll(): Promise<Department[]>;
    findOne(id: number): Promise<Department>;
    create(departmentData: Partial<Department>): Promise<Department>;
    addUserToDepartment(departmentId: number, userId: number): Promise<Department>;
    removeUserFromDepartment(userId: number): Promise<void>;
    update(id: number, dto: UpdateDepartmenDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
