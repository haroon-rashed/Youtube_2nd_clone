import fs from 'fs';
import path from 'path';
import multer from 'multer';
import Books from '../models/booksModel.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    const bookFileName = `bookImage-Haroon-${Date.now()}.${extension}`;
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
    let { title, name, author } = req.body;
    const imageUrl = req.bookFileName || null;

    if (!imageUrl) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    let books=[]
    for(let i=0;i<5000;i++){
    const newBook = await Books.create({
       title,
      name,
      author,
      imageUrl
    });
    books.push(newBook)
  }

    res.status(201).json(books);
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

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, name, author } = req.body;
    const imageUrl = req.bookFileName || null;

    const book = await Books.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (imageUrl) {
      const oldImagePath = path.join('./uploads', book.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Failed to delete old image:', err);
          } else {
            console.log('Old image deleted successfully');
          }
        });
      }
      book.imageUrl = imageUrl;
    }

    book.title = title || book.title;
    book.name = name || book.name;
    book.author = author || book.author;

    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Books.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const imagePath = path.join('./uploads', book.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Failed to delete image file:', err);
        } else {
          console.log('Image file deleted successfully');
        }
      });
    }

    await book.destroy();

    res.status(200).json({ message: 'Book and image deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};
