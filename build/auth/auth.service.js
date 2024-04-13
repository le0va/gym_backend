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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async authenticateGoogle(token) {
        let authEmail;
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            authEmail = ticket.getPayload()?.email;
            if (!authEmail || authEmail === '') {
                throw new common_1.HttpException('Google account is not linked to an email', common_1.HttpStatus.BAD_REQUEST);
            }
            const { id, email, roles, trainingStart, ...noSensetiveData } = await this.usersService.getByEmail(authEmail);
            const accessToken = this.getJwtToken(id, roles);
            return { id, accessToken, roles, isUserTraining: trainingStart ? true : false, ...noSensetiveData };
        }
        catch (err) {
            if (err?.message === 'Gmail account is not linked to an email') {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
            if (err?.message === 'User with this email does not exist' && authEmail !== undefined) {
                const { id, email, roles, trainingStart, ...noSensetiveData } = await this.usersService.createWithGoogle(authEmail);
                const accessToken = this.getJwtToken(id, roles);
                return { id, accessToken, roles, isUserTraining: trainingStart ? true : false, ...noSensetiveData };
            }
            throw new common_1.HttpException('Error during google auth', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getJwtToken(userId, roles) {
        const payload = { sub: userId, roles };
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map