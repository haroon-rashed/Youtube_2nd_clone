import React from 'react'

const BookForm = ({onSubmit}) => {
  const [name, setName] = useState('')
  const [title, settitle] = useState('')
  const [author, setAuthor] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name)
    formData.append('title', title)
    formData.append('author', author)
    formData.append('author', author)
  } 
  
  return (
    <>
      <form onSubmit={handleSubmit}></form>
    </>
  )
}

export default BookForm
