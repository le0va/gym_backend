import { Request } from "express";
import Role from "src/users/role.enum";
export default interface ReqWithUser extends Request {
    user: {
        id: number;
        roles: Role[];
    };
}
