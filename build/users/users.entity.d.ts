import TrainingSession from "src/training/training-sessions.entity";
import Role from "./role.enum";
declare class User {
    id: number;
    room: number;
    name: string;
    email: string;
    roles: Role[];
    trainingStart: null | Date;
    trainingSessions: TrainingSession[];
}
export default User;
