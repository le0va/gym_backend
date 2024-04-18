import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';


const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
);


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    public async authenticateGoogle(token: string) {
        let authEmail: string | undefined;
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            authEmail = ticket.getPayload()?.email;
            if (!authEmail || authEmail === '') {
                throw new HttpException('Google account is not linked to an email', HttpStatus.BAD_REQUEST);
            }
            
            const { id, email, trainingStart, ...noSensetiveData } = await this.usersService.getByEmail(authEmail);      // if user registered
            const accessToken = this.getJwtToken(id);
            return { id, accessToken, isUserTraining: trainingStart ? true : false, ...noSensetiveData };
        }
        catch (err: any) {
            if (err?.message === 'Gmail account is not linked to an email') {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            }
            if (err?.message === 'User with this email does not exist' && authEmail !== undefined) {
                const { id, email, trainingStart, ...noSensetiveData } = await this.usersService.createWithGoogle(authEmail);      // register new user
                const accessToken = this.getJwtToken(id);
                return { id, accessToken, isUserTraining: trainingStart ? true : false, ...noSensetiveData };
            }
            throw new HttpException('Error during google auth', HttpStatus.BAD_REQUEST);
        }
    }

    public getJwtToken(userId: number) {
        const payload = { sub: userId };
        const token = this.jwtService.sign(payload);
        return token;
    }
}
