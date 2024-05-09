import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/user"
import { Book } from "./models/book"
import { Exchange } from "./models/exchange"
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username:"root",
    password: "",
    database: "tere_db",
    synchronize: true,
    logging: false,
    entities: [User, Book, Exchange],
    migrations: [],
    subscribers: []
})