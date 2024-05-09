import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Book } from "./book";
import { Exchange } from "./exchange";

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

    @Column()
    point!: number;

    @OneToMany(() => Book, book => book.owner)
    ownedBooks!: Book[];

    @OneToMany(() => Exchange, exchange => exchange.sender)
    sentExchanges!: Exchange[];

    @OneToMany(() => Exchange, exchange => exchange.receiver)
    receivedExchanges!: Exchange[];
}
