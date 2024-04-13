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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const training_sessions_entity_1 = require("./training-sessions.entity");
const get_trainings_query_dto_1 = require("./dto/get-trainings-query.dto");
const get_trainings_meta_dto_1 = require("./dto/get-trainings-meta.dto");
const get_trainings_response_dto_1 = require("./dto/get-trainings-response.dto");
let TrainingService = class TrainingService {
    constructor(userRepository, trainingRepository) {
        this.userRepository = userRepository;
        this.trainingRepository = trainingRepository;
    }
    async startTraining(userId) {
        const user = await this.userRepository.findOneBy({ id: userId ?? -1 });
        if (!user) {
            throw new common_1.HttpException("User with this id does not exist", common_1.HttpStatus.NOT_FOUND);
        }
        if (user.trainingStart) {
            throw new common_1.HttpException("The user already started training", common_1.HttpStatus.BAD_REQUEST);
        }
        const recentSessions = await this.countUserRecentSessions(userId);
        if (recentSessions >= 3) {
            throw new common_1.HttpException("You can complete no more than 3 training sessions in the last hour", common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        user.trainingStart = new Date();
        await this.userRepository.save(user);
        return { trainingStart: user.trainingStart };
    }
    async finishTraining(userId) {
        const user = await this.userRepository.findOneBy({ id: userId ?? -1 });
        if (!user) {
            throw new common_1.HttpException("User with this id does not exist", common_1.HttpStatus.NOT_FOUND);
        }
        if (!user.trainingStart) {
            throw new common_1.HttpException("The user is currently not training", common_1.HttpStatus.BAD_REQUEST);
        }
        const trainingSession = new training_sessions_entity_1.default();
        trainingSession.start = user.trainingStart;
        trainingSession.end = new Date();
        trainingSession.user = user;
        await this.trainingRepository.save(trainingSession);
        user.trainingStart = null;
        await this.userRepository.save(user);
        return {};
    }
    async getTrainings(options) {
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
        const orderByCond = orderBy === get_trainings_query_dto_1.OrderBy.userName ? 'user.name' :
            orderBy === get_trainings_query_dto_1.OrderBy.room ? 'user.room' :
                orderBy === get_trainings_query_dto_1.OrderBy.trainingStart ? 'session.start' : 'session.end';
        queryBuilder
            .innerJoin('session.user', 'user')
            .select(['session', 'user.name', 'user.room'])
            .where(date ? 'session.start >= :startOfDay AND session.start <= :endOfDay' : '1=1', { startOfDay, endOfDay })
            .andWhere(searchCond ? searchCond.query : '1=1', searchCond?.params)
            .orderBy(orderByCond, order)
            .skip(skip)
            .take(take);
        const [trainings, totalTrainings] = await queryBuilder.getManyAndCount();
        if ((skip > totalTrainings) || (totalTrainings !== 0 && skip == totalTrainings)) {
            throw new common_1.HttpException('Requested page is out of range', common_1.HttpStatus.BAD_REQUEST);
        }
        const meta = new get_trainings_meta_dto_1.default(options, totalTrainings);
        const response = new get_trainings_response_dto_1.default(trainings, meta);
        return response;
    }
    async countUserRecentSessions(userId) {
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        const countRecentSessions = await this.trainingRepository
            .createQueryBuilder('trainingSession')
            .where('trainingSession.end >= :oneHourAgo', { oneHourAgo })
            .andWhere('trainingSession.userId = :userId', { userId })
            .getCount();
        return countRecentSessions;
    }
    parseSearchString(search) {
        const result = search.trim().split(/\s+/).reduce((result, current, i) => {
            result.query += i > 0 ? ' AND ' : '';
            result.query += `(CAST(user.room AS TEXT) LIKE :searchParam${i} OR user.name ILIKE :searchParam${i})`;
            result.params[`searchParam${i}`] = `%${current}%`;
            return result;
        }, { query: '', params: {} });
        return result;
    }
};
exports.TrainingService = TrainingService;
exports.TrainingService = TrainingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(training_sessions_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TrainingService);
//# sourceMappingURL=training.service.js.map