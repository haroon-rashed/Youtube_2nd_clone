import express from 'express';
import { createBooks, getAllBooks } from '../controllers/booksController.js';
import multer from "multer";

const bookRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        let bookFileName = file.fieldname + '-behlole-' + Date.now() + '.' + extension;
        req.bookFileName = bookFileName; // pass to controller
        cb(null, bookFileName);
    }
});

const upload = multer({ storage: storage });


bookRouter.post('/create', upload.single('bookImage'), createBooks);
bookRouter.get('/getBooks', getAllBooks);

export default bookRouter;
