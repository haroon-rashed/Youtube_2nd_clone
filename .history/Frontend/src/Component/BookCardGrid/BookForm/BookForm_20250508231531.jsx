import React, { useEffect, useState } from 'react';

const BookForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setTitle(initialData.title);
      setAuthor(initialData.author);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('author', author);
    if (file) formData.append('bookImage', file);

    onSubmit(formData, initialData?.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <input type="file" onChange={(e) => setFile(URL)} />
      <button type="submit">{initialData ? 'Update' : 'Add'} Book</button>
    </form>
  );
};

export default BookForm;