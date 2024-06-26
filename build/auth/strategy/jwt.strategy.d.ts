import { Strategy } from 'passport-jwt';
import UserPublicJwtDto from '../dto/user-public-jwt.dto';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: UserPublicJwtDto): Promise<{
        id: number;
        roles: import("../../users/role.enum").default[];
    }>;
}
export {};
