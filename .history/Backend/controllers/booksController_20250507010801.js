import Books from "../models/booksModel.js";
import path from 'path';
import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|mp4|mkv/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});


export const createBooks = async (req, res) => {
  try {
    const { title, author } = req.body;
    const file = req.file;

    if (!title || !author || !file) {
      return res.status(400).json({ message: 'Title, author, and file are required' });
    }

    // const newBooks = await Books.create({
    //   title,
    //   name: file.path, 
    //   author,
    // });

    res.status(201).json(newBooks);
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error while creating book' });
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