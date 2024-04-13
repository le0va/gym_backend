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
exports.OrderBy = void 0;
const class_validator_1 = require("class-validator");
var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order || (Order = {}));
var OrderBy;
(function (OrderBy) {
    OrderBy["userName"] = "userName";
    OrderBy["room"] = "room";
    OrderBy["trainingStart"] = "trainingStart";
    OrderBy["trainingEnd"] = "trainingEnd";
})(OrderBy || (exports.OrderBy = OrderBy = {}));
class GetTrainingsOptionsDTO {
    constructor() {
        this.orderBy = OrderBy.trainingStart;
        this.order = Order.DESC;
        this.page = 0;
        this.take = 10;
    }
    get skip() {
        return this.page * this.take;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetTrainingsOptionsDTO.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], GetTrainingsOptionsDTO.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(OrderBy),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetTrainingsOptionsDTO.prototype, "orderBy", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetTrainingsOptionsDTO.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetTrainingsOptionsDTO.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(300),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetTrainingsOptionsDTO.prototype, "take", void 0);
exports.default = GetTrainingsOptionsDTO;
//# sourceMappingURL=get-trainings-query.dto.js.map