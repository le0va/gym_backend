import { CanActivate, ExecutionContext, Type } from "@nestjs/common";
import ReqWithUser from "../interface/req-with-user.interface";
import Role from "src/users/role.enum";

const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardGeneric implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest<ReqWithUser>();
            const user = request.user;

            return user?.roles.includes(role);
        }
    }
    return RoleGuardGeneric;
}

export default RoleGuard;