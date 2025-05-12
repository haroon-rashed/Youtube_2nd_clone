import React, { useState } from 'react';

const BookForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('author', author);
    if (file) formData.append('bookImage', file);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author"/>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="Choose file"/>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
