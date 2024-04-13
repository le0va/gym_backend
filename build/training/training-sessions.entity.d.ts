import User from "src/users/users.entity";
declare class TrainingSession {
    id: number;
    start: Date;
    end: Date;
    user: User;
}
export default TrainingSession;
