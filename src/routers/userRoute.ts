import express , { Router  } from 'express';
import { UserController } from '../controllers/userController';
import { BookController } from '../controllers/bookController';
  
export class UserRoutes{
    public router:Router;
    private userController:UserController; 
    private bookController:BookController
    constructor(){
    this.router= express.Router()
    this.userController= new UserController();
    this.bookController = new BookController()
    this.configRoutes();
    }

    private configRoutes(){
        this.router.get('/',  this.userController.getAll.bind(this.userController));
        this.router.post('/',  this.userController.create.bind(this.userController));
        this.router.get('/:id',  this.userController.getById.bind(this.userController));
        this.router.put('/:id',  this.userController.update.bind(this.userController));
        this.router.delete('/:id',  this.userController.delete.bind(this.userController));

        this.router.get('/:userId/books',  this.bookController.getUserBooks.bind(this.bookController));
        this.router.post('/:userId/books',  this.bookController.create.bind(this.bookController));
        this.router.put('/:userId/books/:id',  this.bookController.update.bind(this.bookController));
        this.router.delete('/:userId/books/:id',  this.bookController.delete.bind(this.bookController));
    }
}
