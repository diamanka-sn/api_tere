import { AppDataSource } from "../data-source";
import { User } from "../models/user";
export class Database {

    constructor() {
        AppDataSource.initialize().then(async () => {
            console.log("TypeORM works and init well in th db")
        }).catch(error => console.log(error))
    }
}
