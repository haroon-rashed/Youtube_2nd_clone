import React, { useState } from 'react';

const BookForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    author: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('name', formData.name);
    data.append('author', formData.author);
    if (formData.image) {
      data.append('bookImage', formData.image);
    }

    if (onSubmit) {
      onSubmit(data); // You can use this to POST to your backend
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
