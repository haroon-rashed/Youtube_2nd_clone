import multer from 'multer';
import Books from '../models/booksModel.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    const bookFileName = `bookImage-behlole-${Date.now()}.${extension}`;
    req.bookFileName = bookFileName;
    cb(null, bookFileName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

export const uploadMiddleware = upload.single('bookImage');

export const createBooks = async (req, res) => {
  try {
    const { title, name, author } = req.body;
    const imageUrl = req.bookFileName || null;

    if (!imageUrl) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const newBook = await Books.create({
      title,
      name,
      author,
      imageUrl
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.findAll();
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Database error');
  }
};