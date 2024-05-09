import { DeepPartial, FindOptions, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
export abstract class AbstractService<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    async getAll(filter: FindOptionsWhere<T>): Promise<T[]> {
        const list: T[] = await this.repository.find({ where: filter });


        return list;
    }
    async getById(filter: FindOptionsWhere<T>): Promise<T | null> {
        const data: T | null = await this.repository.findOneBy(filter);
        return data;

    }

    async notExist(filter: FindOptionsWhere<T>): Promise<boolean> {
        console.log(filter)
        const data = await this.repository.find(
            { where: filter }
        )
        return data.length <= 0 ? true: false
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const result = await this.repository.save(data)

        return result;
    }

    async delete(id: number): Promise<any> {
        const result: any = await this.repository.delete(id)
        return result;
    }

    async update(filter: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<T | null> {
        await this.repository.update(filter, data)
        return this.repository.findOne(filter)
    }
}