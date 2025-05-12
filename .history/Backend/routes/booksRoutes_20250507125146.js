import express from 'express';
import { createBooks, getAllBooks, uploadMiddleware } from '../controllers/booksController.js';

const bookRouter = express.Router();

bookRouter.post('/create', uploadMiddleware, createBooks);
bookRouter.get('/getBooks', getAllBooks);

export default bookRouter;
