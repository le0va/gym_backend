import TrainingSession from "../training-sessions.entity";
import GetTrainingsMetaDto from "./get-trainings-meta.dto";

class GetTrainingsResponseDto {
    data: TrainingSession[];
    meta: GetTrainingsMetaDto;

    constructor(data: TrainingSession[], meta: GetTrainingsMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}

export default GetTrainingsResponseDto;