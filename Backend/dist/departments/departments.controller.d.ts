import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { UpdateDepartmenDto } from './dto/update-department.dto';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    findAll(): Promise<Department[]>;
    findOne(id: string): Promise<Department>;
    create(departmentData: Partial<Department>): Promise<Department>;
    addUser(departmentId: number, userId: number): Promise<Department>;
    removeUserFromDepartment(userId: number): Promise<{
        message: string;
    }>;
    update(id: number, updateDepartmentDto: UpdateDepartmenDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
