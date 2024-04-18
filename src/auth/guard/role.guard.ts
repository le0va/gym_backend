import { CanActivate, ExecutionContext, Inject, Type } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import ReqWithUser from "../interface/req-with-user.interface";
import Role from "src/users/role.enum";

const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardGeneric implements CanActivate {
        constructor(@Inject(UsersService) private usersService: UsersService) { }

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest<ReqWithUser>();
            const user = request.user;

            const { roles } = await this.usersService.getById(user.id);
            return roles.includes(role);
        }
    }
    return RoleGuardGeneric;
}

export default RoleGuard;