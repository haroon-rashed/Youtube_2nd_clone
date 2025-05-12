import Books from "../models/booksModel.js";

export const createBooks = async (req, res) => {
  try {
    // Debugging: Log req.body and req.file
    console.log('Request Body:', req.body);  // Logs book details (title, name, author)
    console.log('Uploaded File:', req.bookFileName);  // Logs the file name after upload

    const { title, name, author } = req.body;
    const imageUrl = req.bookFileName || null;  // If file is uploaded, use its name

    // Check if the file is uploaded, if not, send an error
    if (!imageUrl) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Create a new book record
    const newBook = await Books.create({
      title,
      name,
      author,
      imageUrl
    });

    res.status(201).json(newBook);  // Return the created book as a response
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Failed to create book" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.findAll();  // Retrieve all books from the database
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Database error');
  }
};
