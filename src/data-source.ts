import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/user"
import { Book } from "./models/book"
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST_DB || "localhost",
    port: Number(process.env.PORT_DB) || 3306,
    username: process.env.USER_DB || "root",
    password: process.env.PASSWORD_DB || "",
    database: process.env.DB_NAME || "tere_db",
    synchronize: false,
    logging: false,
    entities: [User, Book],
    migrations: [],
    subscribers: []
})