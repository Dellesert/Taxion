import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<User>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
