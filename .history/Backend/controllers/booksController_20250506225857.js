export const  createBooks = async(req, res) =>{
  const { title , name , author} = req.body;

  const newBooks = await Books.create({
    title,
    name,
    author,
  });

  res.status

}