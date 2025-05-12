import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BookTable = ({  onEdit, onDelete }) => {

  const [books, setBooks] = useState([]);
  
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/books/getBooks');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    useEffect(() => {
      fetchBooks();
    }, []);
  return (
    <div>
      <h2>Books List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.name}</td>
              <td>
                <img src={`http://localhost:8000/uploads/${book.imageUrl}`} alt="book" width="60" />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => onEdit(book)}>
                  <FaEdit />
                </button>
              </td>
              <td>
                <button onClick={() => onDelete(book.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
