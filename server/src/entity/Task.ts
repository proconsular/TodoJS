import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @Column({
        default: false,
    })
    public complete: boolean

    @ManyToOne((type) => User, (user) => user.tasks)
    @JoinColumn()
    public owner: User
}
