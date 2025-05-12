import React, { useEffect, useState } from 'react'
import BookForm from './BookForm';
import BookTable from './BookTable';

const BookFormWrapper = () => {
  const [books , setBooks] =useState([]);
  const fetchBook = async()=>{
    const response = await fetch('http://localhost:8000/api/books/getBooks')
    const data = await response.json()
    setBooks(data);
  }
  useEffect(()=>{
      fetchBook();
  },[])


    const handleDeleten = async (id) =>{
      await fetch (`http://localhost:8000/api/books/delete/${id}`,)
    }
  
  const handleSubmit = async(formData) =>{
    await fetch('http://localhost:8000/api/books/create',
      {
        method: 'POST',
        body: formData
      }
    )
    fetchBook();  
  }
  return (
    <>
      <h1>Book Manager</h1>
      <BookForm onSubmit={handleSubmit}/>
      <BookTable books={books}/>
    </>
  )
}

export default BookFormWrapper
