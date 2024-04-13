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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
let TrainingSession = class TrainingSession {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TrainingSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], TrainingSession.prototype, "start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], TrainingSession.prototype, "end", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.default, (user) => user.trainingSessions, {
        nullable: false,
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", users_entity_1.default)
], TrainingSession.prototype, "user", void 0);
TrainingSession = __decorate([
    (0, typeorm_1.Entity)()
], TrainingSession);
exports.default = TrainingSession;
//# sourceMappingURL=training-sessions.entity.js.map