import express from 'express';
import {
  createBooks,
  getAllBooks,
  uploadMiddleware,
  updateBook // ✅ newly added import
} from '../controllers/booksController.js';

const bookRouter = express.Router();

bookRouter.post('/create', uploadMiddleware, createBooks);
bookRouter.get('/getBooks', getAllBooks);

// ✅ New route for updating a book
bookRouter.put('/update/:id', uploadMiddleware, updateBook);

export default bookRouter;
