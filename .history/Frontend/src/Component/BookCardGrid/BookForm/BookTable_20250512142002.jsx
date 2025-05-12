import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BookTable = ({ books, onEdit, onDelete }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const rowPerPage = 7;
  const totalPages = Math.ceil(books.length / rowPerPage)
  const startIndex = (currentPage - 1) * rowPerPage;
  const currentBooks = books.slice(startIndex, startIndex + rowPerPage)
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow">
          Add Book
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Author</th>
            <th className="py-3 px-6 text-center">Edit</th>
            <th className="py-3 px-6 text-center">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {currentBooks.map((book, index) => (
            <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{startIndex + index + 1}</td>
              <td className="py-3 px-6 text-left">{book.name}</td>
              <td className="py-3 px-6 text-left">
                <img
                  src={`http://localhost:8000/uploads/${book.imageUrl}`}
                  alt="book"
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="py-3 px-6 text-left">{book.title}</td>
              <td className="py-3 px-6 text-left">{book.author}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onEdit(book)}
                  className="text-green-600 hover:text-green-800"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </button>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onDelete(book.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-evenly items-center m-5'>
        {Array.from({ length : totalPages}, (_,i) =>{
          <button key={i + 1} onClick={setCurrentPage(i+1)} className={`p-5 rounded-md ${currentPage == i+ 1}`}></button>
        })}
      </div>
    </div>
  );
};

export default BookTable;
