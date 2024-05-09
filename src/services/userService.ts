import {  Repository } from "typeorm";
import { User } from "../models/user";
import { AbstractService } from "./AbstractService";

export class UserService extends AbstractService<User> {
  
  constructor(repository: Repository<User>) {
    super(repository);
  }
}
