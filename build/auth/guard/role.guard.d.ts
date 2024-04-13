import { CanActivate, Type } from "@nestjs/common";
import Role from "src/users/role.enum";
declare const RoleGuard: (role: Role) => Type<CanActivate>;
export default RoleGuard;
