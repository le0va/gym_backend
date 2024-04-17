import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/users/users.entity';
import TrainingSession from './training-sessions.entity';
import GetTrainingsOptionsDTO, { OrderBy } from './dto/get-trainings-query.dto';
import GetTrainingsMetaDto from './dto/get-trainings-meta.dto';
import GetTrainingsResponseDto from './dto/get-trainings-response.dto';


@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(TrainingSession)
        private trainingRepository: Repository<TrainingSession>
    ) { }


    public async startTraining(userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId ?? -1 });

        if (!user) {
            throw new HttpException("User with this id does not exist", HttpStatus.NOT_FOUND);
        }
        if (user.trainingStart) {
            throw new HttpException("The user already started training", HttpStatus.BAD_REQUEST);
        }

        // Check if user trained more than 3 times last hour
        const recentSessions = await this.countUserRecentSessions(userId);
        if (recentSessions >= 3) {
            throw new HttpException("You can complete no more than 3 training sessions in the last hour", HttpStatus.TOO_MANY_REQUESTS);
        }

        user.trainingStart = new Date();
        await this.userRepository.save(user);

        return { trainingStart: user.trainingStart };
    }


    public async finishTraining(userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId ?? -1 });

        if (!user) {
            throw new HttpException("User with this id does not exist", HttpStatus.NOT_FOUND);
        }
        if (!user.trainingStart) {
            throw new HttpException("The user is currently not training", HttpStatus.BAD_REQUEST);
        }

        const trainingSession = new TrainingSession();
        trainingSession.start = user.trainingStart;
        trainingSession.end = new Date();
        trainingSession.user = user;
        await this.trainingRepository.save(trainingSession);

        user.trainingStart = null;
        await this.userRepository.save(user);

        return {};
    }


    public async getTrainings(options: GetTrainingsOptionsDTO) {
        const { search, date, order, orderBy, take, skip } = options;
        const queryBuilder = this.trainingRepository.createQueryBuilder('session');

        let startOfDay = date ? new Date(date) : null;
        if (startOfDay) {
            startOfDay.setHours(0, 0, 0, 0);
        }
        let endOfDay = date ? new Date(date) : null;
        if (endOfDay) {
            endOfDay.setHours(23, 59, 59, 999);
        }
        const searchCond = search ? this.parseSearchString(search) : null;
        const orderByCond = orderBy === OrderBy.hostel ? 'user.hostel' :
            orderBy === OrderBy.userName ? 'user.name' :
                orderBy === OrderBy.room ? 'user.room' :
                    orderBy === OrderBy.trainingStart ? 'session.start' : 'session.end';

        queryBuilder
            .innerJoin('session.user', 'user')
            .select(['session', 'user.hostel', 'user.room', 'user.name'])
            .where(date ? 'session.start >= :startOfDay AND session.start <= :endOfDay' : '1=1', { startOfDay, endOfDay })
            .andWhere(searchCond ? searchCond.query : '1=1', searchCond?.params)
            .orderBy(orderByCond, order)
            .skip(skip)
            .take(take);

        const [trainings, totalTrainings] = await queryBuilder.getManyAndCount();

        if ((skip > totalTrainings) || (totalTrainings !== 0 && skip == totalTrainings)) {
            throw new HttpException('Requested page is out of range', HttpStatus.BAD_REQUEST);
        }
        const meta = new GetTrainingsMetaDto(options, totalTrainings);
        const response = new GetTrainingsResponseDto(trainings, meta);

        return response;
    }


    public async countUserRecentSessions(userId: number) {
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);

        const countRecentSessions = await this.trainingRepository
            .createQueryBuilder('trainingSession')
            .where('trainingSession.end >= :oneHourAgo', { oneHourAgo })
            .andWhere('trainingSession.userId = :userId', { userId })
            .getCount();

        return countRecentSessions;
    }


    private parseSearchString(search: string) {
        const result = search.trim().split(/\s+/).reduce((result, current, i) => {
            result.query += i > 0 ? ' AND ' : '';
            result.query += `(CAST(user.hostel AS TEXT) LIKE :searchParam${i} OR (CAST(user.room AS TEXT) LIKE :searchParam${i} OR user.name ILIKE :searchParam${i})`;
            result.params[`searchParam${i}`] = `%${current}%`;
            return result;
        }, { query: '', params: {} });
        return result;
    }
}