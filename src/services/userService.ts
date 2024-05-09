import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { AbstractService } from "./AbstractService";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class UserService extends AbstractService<User> {
  
  constructor(repository: Repository<User>) {
    super(repository);
  }
}
