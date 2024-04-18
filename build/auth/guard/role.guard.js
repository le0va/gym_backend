"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
const RoleGuard = (role) => {
    let RoleGuardGeneric = class RoleGuardGeneric {
        constructor(usersService) {
            this.usersService = usersService;
        }
        async canActivate(context) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            const { roles } = await this.usersService.getById(user.id);
            return roles.includes(role);
        }
    };
    RoleGuardGeneric = __decorate([
        __param(0, (0, common_1.Inject)(users_service_1.UsersService)),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], RoleGuardGeneric);
    return RoleGuardGeneric;
};
exports.default = RoleGuard;
//# sourceMappingURL=role.guard.js.map