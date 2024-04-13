import { Repository } from 'typeorm';
import User from 'src/users/users.entity';
import TrainingSession from './training-sessions.entity';
import GetTrainingsOptionsDTO from './dto/get-trainings-query.dto';
import GetTrainingsResponseDto from './dto/get-trainings-response.dto';
export declare class TrainingService {
    private userRepository;
    private trainingRepository;
    constructor(userRepository: Repository<User>, trainingRepository: Repository<TrainingSession>);
    startTraining(userId: number): Promise<{
        trainingStart: Date;
    }>;
    finishTraining(userId: number): Promise<{}>;
    getTrainings(options: GetTrainingsOptionsDTO): Promise<GetTrainingsResponseDto>;
    countUserRecentSessions(userId: number): Promise<number>;
    private parseSearchString;
}
