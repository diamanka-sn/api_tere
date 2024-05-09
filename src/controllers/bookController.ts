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
            const list_books = await this.bookService.getAll({});
            res.json(list_books);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const book = await this.bookService.getById({ id: parseInt(req.params.id) });
            book ? res.json(book) : res.sendStatus(404);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { title, author, description, status } = req.body;
            const ownerId = parseInt(req.params.userId);

            if (!title || !author || !description || !status) {
                return res.status(400).json({ message: 'Données manquantes' });
            }

            const book = new Book();
            book.title = title;
            book.author = author;
            book.description = description;
            book.status = status;

            const owner = await this.getUserById(ownerId);
            if (!owner) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            book.user = owner;

            const createdBook = await this.bookService.create(book);
            res.status(201).json(createdBook);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const book: Book = req.body;
            const bookId = parseInt(req.params.id);
            const userId = req.params?.userId;

            const b = await this.getBookById(bookId);
            if (!b) {
                return res.status(404).json({ message: 'Livre non trouvé' });
            }

            if (b.user?.id !== userId) {
                return res.status(403).json({ message: 'Accès non autorisé' });
            }
            
            const updatedBook = await this.bookService.update({ id: bookId }, book);
            res.json(updatedBook);
        } catch (error: any) {
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

            const book = await this.getBookById(bookId);
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé' });
            }

            if (book.user?.id !== userId) {
                return res.status(403).json({ message: 'Accès non autorisé' });
            }

            await this.bookService.delete(bookId);
            res.sendStatus(204);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserBooks(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId }, relations: ['books'] });

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            res.json(user.books);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(userId: number) {
        const userRepository = AppDataSource.getRepository(User);
        return userRepository.findOne({ where: { id: userId } });
    }

    async getBookById(bookId: number) {
        const bookRepository = AppDataSource.getRepository(Book);
        return bookRepository.findOne({
            where: { id: bookId },
            relations: ['user'],
        });
    }
}