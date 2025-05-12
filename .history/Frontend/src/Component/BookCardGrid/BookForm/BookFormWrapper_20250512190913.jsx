import React, { useEffect, useState } from 'react';
import BookForm from './BookForm';
import BookTable from './BookTable';

const BookFormWrapper = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [GoToTable, setGoToTable] =  useState(false)

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

  if(GoToTable){
    return(
      <BookTable books={books} setGoToTable={setGoToTable} onEdit={handleEdit} onDelete={handleDelete} />
    )
  }

  return (
    <div>
      <BookForm onSubmit={handleSubmit} initialData={editingBook} />
      <div className='flex justify-center p-3'>
       <button onClick={()=>setGoToTable(true)} className='bg-green-500 text-white my-3'> Go To Tables Page</button>
      </div>
    </div>
  );
};

export default BookFormWrapper;
