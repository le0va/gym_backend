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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const users_entity_1 = require("./users.entity");
const role_enum_1 = require("./role.enum");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async getUsers(filter) {
        let users = [];
        switch (filter) {
            case 'all':
                users = await this.usersRepository.find({ select: ['id', 'room', 'name', 'trainingStart'] });
                break;
            case 'training':
                users = await this.usersRepository.find({
                    where: {
                        trainingStart: (0, typeorm_1.Not)((0, typeorm_1.IsNull)())
                    },
                    select: [
                        'id', 'room', 'name', 'trainingStart'
                    ]
                });
                break;
            default:
                throw new common_1.HttpException("Wrong filter passed to request", common_1.HttpStatus.BAD_REQUEST);
        }
        return users;
    }
    async getByEmail(email) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user) {
            return user;
        }
        throw new common_1.HttpException("User with this email does not exist", common_1.HttpStatus.NOT_FOUND);
    }
    async getById(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (user) {
            return user;
        }
        throw new common_1.HttpException("User with this id does not exist", common_1.HttpStatus.NOT_FOUND);
    }
    async createWithGoogle(email) {
        const newUser = this.usersRepository.create({ email });
        await this.usersRepository.save(newUser);
        return newUser;
    }
    async update(id, updateData) {
        const user = await this.getById(id);
        user.name = updateData.name ?? user.name;
        user.room = updateData.room ?? user.room;
        if (user.name && user.room && !user.roles.includes(role_enum_1.default.user)) {
            user.roles.push(role_enum_1.default.user);
        }
        await this.usersRepository.save(user);
        const accessToken = this.getJwtToken(id, user.roles);
        return { accessToken, roles: user.roles };
    }
    getJwtToken(userId, roles) {
        const payload = { sub: userId, roles };
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map