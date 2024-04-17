import { IsDate, IsNumber, IsOptional, IsString, IsEnum, IsInt, Min, Max } from "class-validator";

enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum OrderBy {
    hostel = 'hostel',
    room = 'room',
    userName = 'userName',
    trainingStart = 'trainingStart',
    trainingEnd = 'trainingEnd'
}

class GetTrainingsOptionsDTO {

    @IsString()
    @IsOptional()
    readonly search?: string;

    @IsDate()
    @IsOptional()
    readonly date?: Date;

    @IsEnum(OrderBy)
    @IsOptional()
    readonly orderBy?: OrderBy = OrderBy.trainingStart;

    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.DESC;

    @IsInt()
    @Min(0)
    @IsOptional()
    readonly page: number = 0;

    @IsInt()
    @Min(1)
    @Max(300)
    @IsOptional()
    readonly take: number = 10;

    get skip(): number {
        return this.page * this.take;
    }
}

export default GetTrainingsOptionsDTO;