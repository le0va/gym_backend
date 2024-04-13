import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "src/users/users.entity";

@Entity()
class TrainingSession {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'timestamptz' })
    public start: Date;

    @Column({ type: 'timestamptz' })
    public end: Date;

    @ManyToOne(() => User, (user) => user.trainingSessions, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    public user: User;
}

export default TrainingSession;