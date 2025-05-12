import Books from "../models/booksModel.js";

export const createBooks = async (req, res) => {
  try {
    // Debugging: Log req.body and req.file
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.bookFileName);  // Check the file name

    const { title, name, author } = req.body;
    const imageUrl = req.bookFileName || null;  // If file is uploaded, use bookFileName

    if (!imageUrl) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newBook = await Books.create({
      title,
      name,
      author,
      imageUrl
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Failed to create book" });
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
