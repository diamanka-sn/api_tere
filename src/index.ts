import "reflect-metadata"
import express from "express";
import bodyParser from "body-parser";
import { UserRoutes } from "./routers/userRoute";
import { BookRoutes } from './routers/bookRoute';
import  cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization,multipart/form-data"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = new UserRoutes();
const bookRoutes = new BookRoutes();

app.use("/utilisateurs", userRoutes.router);
app.use("/books", bookRoutes.router);


app.listen(process.env.PORT || 3000);
console.log("Server started on port " + process.env.PORT || 3000);