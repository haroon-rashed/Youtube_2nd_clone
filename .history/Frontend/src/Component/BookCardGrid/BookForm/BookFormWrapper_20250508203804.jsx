import React, { useEffect, useState } from 'react'
import BookForm from './BookForm';
import BookTable from './BookTable';

const BookFormWrapper = () => {
  const [books , setBooks] =useState([]);
  const [editingBook, setEditingBook] = useState(null)
  const fetchBook = async()=>{
    const response = await fetch('http://localhost:8000/api/books/getBooks')
    const data = await response.json()
    setBooks(data);
  }
  useEffect(()=>{
      fetchBook();
  },[])


    const handleDelete = async (id) =>{
      await fetch (`http://localhost:8000/api/books/delete/${id}`, {method : 'DELETE'})
      fetchBook();
    }


    const handleEdit = (book) =>{
      setEditingBook(book)
    }
  
  const handleSubmit = async(formData, id) =>{
    if(id){
         await fetch(`http://localhost:8000/api/books/update/${id}`,{
          method:'PUT',
          body: formData
         })
    }else{
      await fetch('http://localhost:8000/api/books/create',
        {
          method: 'POST',
          body: formData
        }
      )
    }
    fetchBook();  
  }
  return (
    <>
      <h1>Book Manager</h1>
      <BookForm onSubmit={handleSubmit}/>
      <BookTable books={books} onDelete={handleDelete} onEdit={handleEdit}/>
    </>
  )
}

export default BookFormWrapper
