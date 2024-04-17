import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import TrainingSession from "src/training/training-sessions.entity";
import Role from "./role.enum";


@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public hostel: number;

    @Column({ nullable: true })
    public room: number;

    @Column({ nullable: true })
    public name: string;

    @Column({ unique: true })
    public email: string;

    @Column({
        type: 'enum',
        enum: Role,
        array: true,
        default: [Role.guest]
    })
    public roles: Role[];

    @Column({ type: 'timestamptz', nullable: true })
    public trainingStart: null | Date;

    @OneToMany(() => TrainingSession, (session) => session.user, {
    })
    public trainingSessions: TrainingSession[];
}


export default User;