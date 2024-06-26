import { DeepPartial, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
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
        const data = await this.repository.find(
            { where: filter }
        )
        return data.length <= 0
    }
    async getByFilter(filter: FindOptionsWhere<T>): Promise<T | null> {
        const data = await this.repository.findOne(
            { where: filter }
        )
        return data
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const result = await this.repository.save(data)

        return result;
    }

    async delete(id: number): Promise<T> {
        const result: any = await this.repository.delete(id)
        return result;
    }

    async update(filter: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<T | null> {
        await this.repository.update(filter, data)
        const result = await this.repository.findOneBy(filter);

        return result;
    }
}