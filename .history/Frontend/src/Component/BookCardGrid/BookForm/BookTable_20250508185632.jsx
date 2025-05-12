import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const BookTable = ({books}) => {
  return (
    <>
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
           {books?.map((book, index)=>{
            <tr key={index}>
               <td>{index + 1}</td>
               <td>{book?.name}</td>
               <td><img src={`http://localhost:8000/uploads/${book.imageUrl}`} alt="bookImage" width="100" /></td>
               <td>{book?.title}</td>
               <td>{book?.author}</td>
               <td> <FaEdit /></td>
               <td> <FaTrash /></td>
            </tr>
           })}
      </tbody>
     </table> 
    </>
  )
}

export default BookTable
