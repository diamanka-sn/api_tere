import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';
import { Book } from './book';

@Entity()
export class Exchange {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: 'pending' })
  status!: string;

  @ManyToOne(() => User, user => user.sentExchanges)
  sender!: User;

  @ManyToOne(() => User, user => user.receivedExchanges)
  receiver!: User;

  @ManyToOne(() => Book, book => book.owner)
  book!: Book;
}