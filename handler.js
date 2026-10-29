const { nanoid } = require('nanoid');
const books = require('./books')

const getAllBooks = () => ({
  status: "success",
  data: {
    books
  }
});

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = request.payload;
  const id = nanoid(16);

  const insertedAt = new Date().toDateString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (name === "") {
    return h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    }).code(400);
  }

  if (isSuccess) {
    return h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id
      }
    }).code(201);
  }

};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((book) => book.id === id)[0];

  if (book != undefined) {
    return h.response({
      status: "success",
      data: {
        book,
      },
    }).code(200);
  }

  return h.response({
    status: "fail",
    message: "Buku tidak ditemukan"
  }).code(404);
};

const updateBookhandler = (request, h) => {
  const { id } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = params.payload;

  const bookIndex = books.findIndex((book) => book.id === id);
};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    }).code(200);
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  }).code(404);

  return response;

};

module.exports = {
  getAllBooks,
  addBookHandler,
  getBookByIdHandler,
  updateBookhandler,
  deleteBookHandler
};
