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

    @Column()
    status?: string;

    @ManyToOne(() => User, user => user.books)
    user?: User;
}