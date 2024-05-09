import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../models/book";

export class BookController {
    private bookService!: BookService;

    constructor() {
        AppDataSource.initialize()
            .then(async () => {
                this.bookService = new BookService(AppDataSource.getRepository(Book));
            })
            .catch((error) => console.log(error));
    }
    async getAll(req: Request, res: Response) {
        try {
            const list_books = await this.bookService.getAllBooks({})
            res.json(list_books)
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const book = await this.bookService.getBookById({ id: parseInt(req.params.id) });
            if (book) {
                res.json(book);
            } else {
                res.sendStatus(404);
            }
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { title, author, description, condition } = req.body;
            const ownerId = parseInt(req.params.ownerId);
            if (!title || !author || !description || !condition) {
                return res.status(400).json({ message: 'Données manquantes' });
            }

            const book = new Book();
            book.title = title;
            book.author = author;
            book.description = description;
            book.condition = condition;
            book.points = 100;

            const userRepository = AppDataSource.getRepository(User);
            const owner = await userRepository.findOne({ where: { id: ownerId } });
            if (!owner) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            book.owner = owner;

            const createdBook = await this.bookService.createBook(book);
            res.status(201).json(createdBook);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { title, author, description, condition, points } = req.body;
            const bookId = parseInt(req.params.id);
            const userId = req.params?.userId; 

            if (!userId) {
                return res.status(401).json({ message: 'Non autorisé' });
            }

            const bookRepository = AppDataSource.getRepository(Book);
            const book = await bookRepository.findOne({
                where: { id: bookId },
                relations: ['owner'],
            });

            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé' });
            }

            if (book.owner.id !== userId) {
                return res.status(403).json({ message: 'Accès non autorisé' });
            }

            book.title = title;
            book.author = author;
            book.description = description;
            book.condition = condition;
            book.points = points;

            const updatedBook = await this.bookService.updateBook({ id: bookId }, book);
            res.json(updatedBook);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const bookId = parseInt(req.params.id);
            const userId = req.params?.userId; 

            if (!userId) {
                return res.status(401).json({ message: 'Non autorisé' });
            }

            const bookRepository = AppDataSource.getRepository(Book);
            const book = await bookRepository.findOne({
                where: { id: bookId },
                relations: ['owner'],
            });

            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé' });
            }

            if (book.owner.id !== userId) {
                return res.status(403).json({ message: 'Accès non autorisé' });
            }

            const result = await this.bookService.deleteBook(bookId);
            res.sendStatus(204);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserBooks(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId }, relations: ['ownedBooks'] });

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            res.json(user.ownedBooks);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
}