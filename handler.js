const books = require('./books')

const getAllBooks = () => ({
  status: "success",
  data: {
    books
  }
});

const addBooksHandler = () => ({
  
});

module.exports = { getAllBooks, addBooksHandler };