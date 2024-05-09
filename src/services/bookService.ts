import { Book } from '../models/book';
import { Repository } from 'typeorm';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { AbstractService } from './AbstractService';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BookService extends AbstractService<Book> {
    constructor(repository: Repository<Book>) {
        super(repository);
    }

    // async getAllBooks(filter: FindOptionsWhere<Book>): Promise<Book[]> {
    //     return this.getAll(filter);
    // }

    // async getBookById(filter: FindOptionsWhere<Book>): Promise<Book | null> {
    //     return this.getById(filter);
    // }

    // async createBook(data: DeepPartial<Book>): Promise<Book> {
    //     return this.create(data);
    // }

    // async updateBook(filter: FindOptionsWhere<Book>, data: QueryDeepPartialEntity<Book>): Promise<Book | null> {
    //     return this.update(filter, data);
    // }

    // async deleteBook(id: number): Promise<any> {
    //     return this.delete(id);
    // }
}