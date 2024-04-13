import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import User from './users.entity';
import UpdateUserDto from './dto/updateUser.dto';
import Role from './role.enum';
export declare class UsersService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    getUsers(filter: string): Promise<User[]>;
    getByEmail(email: string): Promise<User>;
    getById(id: number): Promise<User>;
    createWithGoogle(email: string): Promise<User>;
    update(id: number, updateData: UpdateUserDto): Promise<{
        accessToken: string;
        roles: Role[];
    }>;
    getJwtToken(userId: number, roles: Role[]): string;
}
