import React, { useEffect, useState } from 'react';
import BookForm from './BookForm';
import BookTable from './BookTable';

const BookFormWrapper = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    const res = await fetch('http://localhost:8000/api/books/getBooks');
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/books/delete/${id}`, { method: 'DELETE' });
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditingBook(book); 
  };

  const handleSubmit = async (formData, id) => {
    if (id) {
      await fetch(`http://localhost:8000/api/books/update/${id}`, {
        method: 'PUT',
        body: formData
      });
    } else {
      await fetch('http://localhost:8000/api/books/create', {
        method: 'POST',
        body: formData
      });
    }

    setEditingBook(null);
    fetchBooks();
  };

  return (
    <div>
      <h1>Books Manager</h1>
      <BookForm onSubmit={handleSubmit} initialData={editingBook} />
      <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default BookFormWrapper;
