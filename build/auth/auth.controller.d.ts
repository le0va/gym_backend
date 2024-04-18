import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuth(token: string): Promise<{
        hostel: number;
        room: number;
        name: string;
        roles: import("../users/role.enum").default[];
        trainingSessions: import("../training/training-sessions.entity").default[];
        id: number;
        accessToken: string;
        isUserTraining: boolean;
    }>;
}
