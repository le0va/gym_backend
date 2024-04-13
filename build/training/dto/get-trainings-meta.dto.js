"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetTrainingsMetaDto {
    constructor(options, totalItems) {
        this.page = options.page;
        this.totalItems = totalItems;
        this.totalPages = Math.ceil(totalItems / options.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.totalPages;
    }
}
exports.default = GetTrainingsMetaDto;
//# sourceMappingURL=get-trainings-meta.dto.js.map