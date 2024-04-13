import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import Role from 'src/users/role.enum';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    authenticateGoogle(token: string): Promise<{
        room: number;
        name: string;
        trainingSessions: import("../training/training-sessions.entity").default[];
        id: number;
        accessToken: string;
        roles: Role[];
        isUserTraining: boolean;
    }>;
    getJwtToken(userId: number, roles: Role[]): string;
}
