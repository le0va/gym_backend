import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuth(token: string): Promise<{
        room: number;
        name: string;
        trainingSessions: import("../training/training-sessions.entity").default[];
        id: number;
        accessToken: string;
        roles: import("../users/role.enum").default[];
        isUserTraining: boolean;
    }>;
}
