import GetTrainingsOptionsDTO from "./get-trainings-query.dto";

class GetTrainingsMetaDto {
    readonly page: number;
    // readonly take: number;
    readonly totalItems: number;
    readonly totalPages: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;

    constructor(options: GetTrainingsOptionsDTO, totalItems: number) {
        this.page = options.page;
        // this.take = options.take;
        this.totalItems = totalItems;
        this.totalPages = Math.ceil(totalItems / options.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.totalPages;
    }
}

export default GetTrainingsMetaDto;