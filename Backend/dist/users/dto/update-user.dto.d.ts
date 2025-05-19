import { UserType } from '../entities/user.entity';
export declare class UpdateUserDto {
    username: string;
    email: string;
    user_type?: UserType;
    password: string;
    logged_in: boolean;
    user_token: string;
    token_expiration: string;
    token_vk: string;
    token_google: string;
}
