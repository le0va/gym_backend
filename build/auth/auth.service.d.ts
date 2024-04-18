import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    authenticateGoogle(token: string): Promise<{
        hostel: number;
        room: number;
        name: string;
        roles: import("../users/role.enum").default[];
        trainingSessions: import("../training/training-sessions.entity").default[];
        id: number;
        accessToken: string;
        isUserTraining: boolean;
    }>;
    getJwtToken(userId: number): string;
}
