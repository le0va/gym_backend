"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoleGuard = (role) => {
    class RoleGuardGeneric {
        canActivate(context) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            return user?.roles.includes(role);
        }
    }
    return RoleGuardGeneric;
};
exports.default = RoleGuard;
//# sourceMappingURL=role.guard.js.map