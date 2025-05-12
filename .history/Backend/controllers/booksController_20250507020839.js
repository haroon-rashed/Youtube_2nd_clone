import Books from "../models/booksModel.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
export const  createBooks = async(req, res) =>{
  const { title , name , author} = req.body;

  const newBooks = await Books.create({
    title,
    name,
    author,
  });

  res.status(201).json(newBooks)

}

export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.findAll(); 
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Database error');
  }
};