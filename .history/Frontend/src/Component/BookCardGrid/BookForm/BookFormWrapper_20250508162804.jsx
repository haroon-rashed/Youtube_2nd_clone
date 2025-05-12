import React, { useEffect, useState } from 'react'

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
      
    </>
  )
}

export default BookFormWrapper
