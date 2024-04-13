import { Controller, Get, Param, Patch, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrainingService } from './training.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import GetTrainingsOptionsDTO from './dto/get-trainings-query.dto';
import GetTrainingsResponseDto from './dto/get-trainings-response.dto';
import RoleGuard from 'src/auth/guard/role.guard';
import Role from 'src/users/role.enum';
import ReqWithUser from 'src/auth/interface/req-with-user.interface';


@Controller('training')
export class TrainingController {
    constructor(
        private readonly trainingService: TrainingService
    ) { }

    @UseGuards(RoleGuard(Role.user))
    @UseGuards(JwtAuthGuard)
    @Patch('start')
    startTraining(@Req() req: ReqWithUser) {
        return this.trainingService.startTraining(req.user.id);
    }

    @UseGuards(RoleGuard(Role.user))
    @UseGuards(JwtAuthGuard)
    @Patch('finish')
    finishTraining(@Req() req: ReqWithUser) {
        return this.trainingService.finishTraining(req.user.id);
    }

    @Get()
    getTrainings(@Query() options: GetTrainingsOptionsDTO): Promise<GetTrainingsResponseDto> {
        return this.trainingService.getTrainings(options);
    }
}
