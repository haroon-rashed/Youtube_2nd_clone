import React, { useEffect, useState } from 'react';

const BookForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [fileObject, setFileObject] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setTitle(initialData.title || '');
      setAuthor(initialData.author || '');
      setFile(initialData.imageUrl || null);
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFileObject(selectedFile);
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('author', author);
    if (fileObject) formData.append('bookImage', fileObject);

    onSubmit(formData, initialData?.id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
  <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      {initialData ? 'Edit Book' : 'Add New Book'}
    </h2>
    
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
        Collection Name
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., My Favorite Books"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
        Book Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., The Great Gatsby"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="author" className="block text-gray-700 text-sm font-medium mb-2">
        Author
      </label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="e.g., F. Scott Fitzgerald"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-6">
      <label htmlFor="bookImage" className="block text-gray-700 text-sm font-medium mb-2">
        Book Cover Image
      </label>
      <input
        type="file"
        id="bookImage"
        onChange={handleFileChange}
        accept="image/*"
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {file && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <img 
            src={file} 
            alt="Book cover preview" 
            className="h-40 object-contain border border-gray-200 rounded-md" 
          />
        </div>
      )}
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      {initialData ? 'Update Book' : 'Add Book'}
    </button>
  </form>
</div>
  );
};

export default BookForm;