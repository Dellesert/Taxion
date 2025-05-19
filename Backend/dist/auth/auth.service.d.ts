import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(username: string, email: string, password: string): Promise<User>;
}
