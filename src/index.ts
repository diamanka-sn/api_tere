import "reflect-metadata"
import express from "express";
import bodyParser from "body-parser";
import { UserRoutes } from "./routers/userRoute";
import { BookRoutes } from './routers/bookRoute';
require("dotenv").config();


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = new UserRoutes();
const bookRoutes = new BookRoutes();

app.use("/utilisateurs", userRoutes.router);
app.use("/books", bookRoutes.router);


app.listen(process.env.PORT || 3000);
console.log("Server started on port " + process.env.PORT || 3000);