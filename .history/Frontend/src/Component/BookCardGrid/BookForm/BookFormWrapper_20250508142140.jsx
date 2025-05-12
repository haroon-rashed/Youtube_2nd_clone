import React from 'react';
import BookForm from './BookForm';

const BookFormWrapper = () => {
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/books/createBooks', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log('Book created:', result);
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error submitting book:', error);
      alert('Failed to add book.');
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default BookFormWrapper;
