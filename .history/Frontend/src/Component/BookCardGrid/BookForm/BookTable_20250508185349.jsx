import React from 'react'

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
               <td>{book.n}</td>
            </tr>
           })}
      </tbody>
     </table> 
    </>
  )
}

export default BookTable
