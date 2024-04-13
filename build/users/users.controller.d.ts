import { UsersService } from './users.service';
import ReqWithUserId from 'src/auth/interface/req-with-user.interface';
import UpdateUserDto from './dto/updateUser.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(filter: string): Promise<import("./users.entity").default[]>;
    getUserById(userId: string): Promise<{
        isUserTraining: boolean;
        id: number;
        room: number;
        name: string;
        roles: import("./role.enum").default[];
        trainingSessions: import("../training/training-sessions.entity").default[];
    }>;
    update(req: ReqWithUserId, updateData: UpdateUserDto): Promise<{
        accessToken: string;
        roles: import("./role.enum").default[];
    }>;
}
