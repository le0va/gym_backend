import TrainingSession from "../training-sessions.entity";
import GetTrainingsMetaDto from "./get-trainings-meta.dto";
declare class GetTrainingsResponseDto {
    data: TrainingSession[];
    meta: GetTrainingsMetaDto;
    constructor(data: TrainingSession[], meta: GetTrainingsMetaDto);
}
export default GetTrainingsResponseDto;
