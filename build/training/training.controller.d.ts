import { TrainingService } from './training.service';
import GetTrainingsOptionsDTO from './dto/get-trainings-query.dto';
import GetTrainingsResponseDto from './dto/get-trainings-response.dto';
import ReqWithUser from 'src/auth/interface/req-with-user.interface';
export declare class TrainingController {
    private readonly trainingService;
    constructor(trainingService: TrainingService);
    startTraining(req: ReqWithUser): Promise<{
        trainingStart: Date;
    }>;
    finishTraining(req: ReqWithUser): Promise<{}>;
    getTrainings(options: GetTrainingsOptionsDTO): Promise<GetTrainingsResponseDto>;
}
