import GetTrainingsOptionsDTO from "./get-trainings-query.dto";
declare class GetTrainingsMetaDto {
    readonly page: number;
    readonly totalItems: number;
    readonly totalPages: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    constructor(options: GetTrainingsOptionsDTO, totalItems: number);
}
export default GetTrainingsMetaDto;
