import express , { Router  } from 'express';
import { BookController } from '../controllers/bookController';
  
export class BookRoutes{
    public router:Router;
    private bookController:BookController; 
    constructor(){
    this.router= express.Router()
    this.bookController= new BookController();
    this.configRoutes();
    }

    private configRoutes(){
        this.router.get('/',  this.bookController.getAll.bind(this.bookController));
        this.router.get('/:id',  this.bookController.getById.bind(this.bookController));
    }
}
