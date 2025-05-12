import express from 'express'
import { createBooks } from '../controllers/booksController.js'
const bookRouter = express.Router()


bookRouter.post('/create', createBooks)


export default bookRouter;