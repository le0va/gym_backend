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
exports.TrainingController = void 0;
const common_1 = require("@nestjs/common");
const training_service_1 = require("./training.service");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const get_trainings_query_dto_1 = require("./dto/get-trainings-query.dto");
const role_guard_1 = require("../auth/guard/role.guard");
const role_enum_1 = require("../users/role.enum");
let TrainingController = class TrainingController {
    constructor(trainingService) {
        this.trainingService = trainingService;
    }
    startTraining(req) {
        return this.trainingService.startTraining(req.user.id);
    }
    finishTraining(req) {
        return this.trainingService.finishTraining(req.user.id);
    }
    getTrainings(options) {
        return this.trainingService.getTrainings(options);
    }
};
exports.TrainingController = TrainingController;
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)(role_enum_1.default.user)),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('start'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "startTraining", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)(role_enum_1.default.user)),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('finish'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "finishTraining", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_trainings_query_dto_1.default]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getTrainings", null);
exports.TrainingController = TrainingController = __decorate([
    (0, common_1.Controller)('training'),
    __metadata("design:paramtypes", [training_service_1.TrainingService])
], TrainingController);
//# sourceMappingURL=training.controller.js.map