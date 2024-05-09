import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Book } from "./book";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number | string;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column()
    phone!: string;

    @Column()
    password!: string;

    @OneToMany(() => Book, book => book.user)
    books!: Book[];
}
