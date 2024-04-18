import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import User from './users.entity';
import UpdateUserDto from './dto/updateUser.dto';
import Role from './role.enum';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async getUsers(filter: string) {
        let users: User[] = [];
        switch (filter) {
            case 'all':
                users = await this.usersRepository.find({ select: ['id', 'hostel', 'room', 'name', 'trainingStart'] });
                break;
            case 'training':
                users = await this.usersRepository.find({
                    where: {
                        trainingStart: Not(IsNull())
                    },
                    select: [
                        'id', 'hostel', 'room', 'name', 'trainingStart'
                    ]
                });
                break;
            default:
                throw new HttpException("Wrong filter passed to request", HttpStatus.BAD_REQUEST);
        }
        return users;
    }


    async getByEmail(email: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user) {
            return user;
        }
        throw new HttpException("User with this email does not exist", HttpStatus.NOT_FOUND);
    }


    async getById(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (user) {
            return user;
        }
        throw new HttpException("User with this id does not exist", HttpStatus.NOT_FOUND);
    }


    async createWithGoogle(email: string) {
        const newUser = this.usersRepository.create({ email });
        await this.usersRepository.save(newUser);
        return newUser;
    }


    async update(id: number, updateData: UpdateUserDto) {
        const user = await this.getById(id);
        user.hostel = updateData.hostel ?? user.hostel;
        user.room = updateData.room ?? user.room;
        user.name = updateData.name ?? user.name;
        if (user.hostel && user.room && user.name && !user.roles.includes(Role.user)) {
            user.roles.push(Role.user);
        }
        await this.usersRepository.save(user);
        const accessToken = this.getJwtToken(id);
        return { accessToken, roles: user.roles };
    }


    public getJwtToken(userId: number) {
        const payload = { sub: userId };
        const token = this.jwtService.sign(payload);
        return token;
    }
}