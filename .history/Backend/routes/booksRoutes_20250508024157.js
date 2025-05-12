import express from 'express';
import {
  createBooks,
  getAllBooks,
  uploadMiddleware,
  updateBook 
} from '../controllers/booksController.js';

const bookRouter = express.Router();

bookRouter.post('/create', uploadMiddleware, createBooks);
bookRouter.get('/getBooks', getAllBooks);

bookRouter.put('/update/:id', uploadMiddleware, updateBook);
bookRouter.delete('/delete/:id', deleteBook);

export default bookRouter;
