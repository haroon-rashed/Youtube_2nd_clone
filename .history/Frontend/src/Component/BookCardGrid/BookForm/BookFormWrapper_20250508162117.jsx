import React, { useState } from 'react'

const BookFormWrapper = () => {
  const [books , setBooks] =useState([]);
  const fetchBook = async()=>{
    const response = await fetch('http://localhost:8000/api/books/getBooks')
    const data = await response.json()
  }
  return (
    <>
      
    </>
  )
}

export default BookFormWrapper
