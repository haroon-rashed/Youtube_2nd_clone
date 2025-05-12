import React, { useEffect, useState } from 'react';

const BookForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        {initialData ? 'Update Book' : 'Add New Book'}
      </h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border rounded-md"
      />

      {preview && (
        <div className="text-center">
          <img src={preview} alt="Preview" className="mx-auto h-24 object-cover rounded-md" />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        {initialData ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;
