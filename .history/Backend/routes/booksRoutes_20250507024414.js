import express from 'express';
import multer from 'multer';
import { createBooks, getAllBooks } from '../controllers/booksController.js';

const bookRouter = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the uploads folder exists and is the destination for the files
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];  // Get the file extension
    const bookFileName = `bookImage-behlole-${Date.now()}.${extension}`;
    req.bookFileName = bookFileName;  // Pass the filename to the controller
    cb(null, bookFileName);  // Save the file with the generated name
  }
});

// Multer instance with limits for file size
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }  // 10MB file size limit
});

// Routes
bookRouter.post('/create', upload.single('bookImage'), createBooks);  // Upload and create book
bookRouter.get('/getBooks', getAllBooks);  // Get all books

export default bookRouter;
