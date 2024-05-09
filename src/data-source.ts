import "reflect-metadata"
import { DataSource } from "typeorm"
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST_DB,
    port: parseInt(process.env.PORT_DB || "3306", 10),
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"],
    migrations: [],
    subscribers: []
})