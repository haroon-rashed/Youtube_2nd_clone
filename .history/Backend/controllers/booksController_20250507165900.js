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

// Create a new book
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

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.findAll();
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Database error');
  }
};

// Update book details (newly added functionality)
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, name, author } = req.body;
    let imageUrl = req.bookFileName || null;

    // Find the book by ID
    const book = await Books.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // If a new image is uploaded, we update the imageUrl
    if (imageUrl) {
      // Optionally, you can delete the old image from the server here, before updating
      // fs.unlinkSync(`./uploads/${book.imageUrl}`); // Uncomment if you want to delete the old image

      book.imageUrl = imageUrl; // Update the book's image
    }

    // Update the rest of the book details
    book.title = title || book.title;
    book.name = name || book.name;
    book.author = author || book.author;

    // Save the updated book
    await book.save();

    res.status(200).json(book); // Return the updated book
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};
