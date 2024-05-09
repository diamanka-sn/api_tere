import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title?: string;

    @Column()
    author!: string;

    @Column()
    description!: string;

    @Column({ default: 'new' })
    condition!: string;

    @Column({ default: 100 })
    points!: number;

    @ManyToOne(() => User, user => user.ownedBooks)
    owner!: User;
}