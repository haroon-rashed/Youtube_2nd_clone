import express from 'express'
import { createBooks } from '../controllers/booksController'
const bookRouter = express.Router()


bookRouter.post('/create', createBooks)


export default bookRouter;