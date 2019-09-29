import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './Task';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column({
        default: '',
    })
    public password: string;

    @Column({
        default: '',
    })
    public token: string;

    @Column({
        default: false,
    })
    public online: boolean;

    @OneToMany((type) => Task, (task) => task.owner, {
        cascade: true,
    })
    public tasks: Task[]
}
