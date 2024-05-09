import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { AbstractService } from "./AbstractService";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class UserService extends AbstractService<User> {
  
  constructor(repository: Repository<User>) {
    super(repository);
  }

  async getAllUsers(filter: FindOptionsWhere<User>): Promise<User[]> {
    return this.getAll(filter);
  }

  async getUserById(filter: FindOptionsWhere<User>): Promise<User | null> {
    return this.getById(filter);
  }

  async createUser(data: DeepPartial<User>): Promise<User> {
    return this.create(data);
  }

  async updateUser(filter: FindOptionsWhere<User>, data: QueryDeepPartialEntity<User>): Promise<User | null> {
    return this.update(filter, data);
  }

  async deleteUser(id: number): Promise<any> {
    return this.delete(id);
  }

  async userNotExist(filter: FindOptionsWhere<User>): Promise<boolean> {
    return this.notExist(filter);
  }
}
