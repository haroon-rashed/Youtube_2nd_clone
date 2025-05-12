import express from 'express'
import { createBooks, getAllBooks } from '../controllers/booksController.js'
const bookRouter = express.Router()


bookRouter.post('/create', createBooks)
bookRouter.get('/getBooks', getAllBooks);

export default bookRouter;