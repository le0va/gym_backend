import { Controller, Body, Get, Query, Patch, UseGuards, Req, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import ReqWithUserId from 'src/auth/interface/req-with-user.interface';
import UpdateUserDto from './dto/updateUser.dto';
import ReqWithUser from 'src/auth/interface/req-with-user.interface';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    getUsers(@Query('filter') filter: string) {
        return this.usersService.getUsers(filter);
    }

    @Get(':userId')
    async getUserById(@Param('userId') userId: string) {
        const { email, trainingStart, ...noSensetiveData } = await this.usersService.getById(Number(userId));
        return { ...noSensetiveData, isUserTraining: trainingStart ? true : false };

    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    update(@Req() req: ReqWithUserId, @Body() updateData: UpdateUserDto) {
        return this.usersService.update(req.user.id, updateData);
    }

}
