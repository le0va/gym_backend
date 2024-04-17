declare enum Order {
    ASC = "ASC",
    DESC = "DESC"
}
export declare enum OrderBy {
    hostel = "hostel",
    room = "room",
    userName = "userName",
    trainingStart = "trainingStart",
    trainingEnd = "trainingEnd"
}
declare class GetTrainingsOptionsDTO {
    readonly search?: string;
    readonly date?: Date;
    readonly orderBy?: OrderBy;
    readonly order?: Order;
    readonly page: number;
    readonly take: number;
    get skip(): number;
}
export default GetTrainingsOptionsDTO;
