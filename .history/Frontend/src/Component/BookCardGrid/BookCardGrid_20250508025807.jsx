import React, { useEffect, useState } from 'react';
import './BookCardGrid.css';
import {Link} from 'rect-router-dom '

const BookCardGrid = () => {
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
    <>

    <div className="book-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
           <img 
            src={`http://localhost:8000/uploads/${book.imageUrl}`} 
             alt={book.title} 
              className="book-image" />
          <div className="book-info">
            <h4 className="book-title">{book.title}</h4>
            <p className="book-author">by {book.author}</p>
          </div>
        </div>
      ))}
    </div>
    <Link>  Go to Book Table</Link>
    </>
  );
};

export default BookCardGrid;
