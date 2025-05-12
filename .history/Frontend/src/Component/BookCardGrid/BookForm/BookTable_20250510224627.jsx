import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BookTable = ({ books, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const totalPages = Math.ceil(books.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentBooks = books.slice(startIndex, startIndex + rowsPerPage);

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

      {/* Pagination Buttons */}
    {/* Pagination Buttons */}
<div className="flex justify-center items-center mt-8 space-x-1">
  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    &larr;
  </button>

  {Array.from({ length: totalPages }, (_, i) => {
    const pageNumber = i + 1;
    // Show only nearby pages if there are many
    if (
      totalPages <= 7 ||
      pageNumber === 1 ||
      pageNumber === totalPages ||
      Math.abs(pageNumber - currentPage) <= 2
    ) {
      return (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`px-4 py-2 border ${
            currentPage === pageNumber
              ? 'border-blue-500 bg-blue-500 text-white font-medium'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          } transition-colors duration-150 ease-in-out`}
        >
          {pageNumber}
        </button>
      );
    }
    // Show ellipsis for hidden pages
    if (
      (pageNumber === 2 && currentPage > 4) ||
      (pageNumber === totalPages - 1 && currentPage < totalPages - 3)
    ) {
      return <span key={pageNumber} className="px-2 py-2 text-gray-500">...</span>;
    }
    return null;
  })}

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
    disabled={currentPage === totalPages}
    className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    &rarr;
  </button>
</div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Copyright © Your Website 2025
      </div>
    </div>
  );
};

export default BookTable;
