import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('google')
    async googleAuth(@Body('token') token: string) {
        return this.authService.authenticateGoogle(token);
    }
}
