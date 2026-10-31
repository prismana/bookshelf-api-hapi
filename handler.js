const { nanoid } = require("nanoid");
const books = require("./books");

const getAllBooks = (request, h) => {
  const bookResponse = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher
  }));

  return h.response({
    status: "success",
    data: {
      books: bookResponse
    },
  }).code(200);
};

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    }).code(400);
  };

  if (readPage > pageCount) {
    return h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    }).code(400);
  };

  const id = nanoid(16);

  const insertedAt = new Date().toDateString();
  const updatedAt = insertedAt;

  // status of book has finished reading or not
  const isFinished = readPage === pageCount;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: finished !== undefined ? finished : isFinished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    }).code(201);
  };
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
    message: "Buku tidak ditemukan",
  }).code(404);
};

const updateBookhandler = (request, h) => {
  const { id } = request.params;

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    }).code(404);
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
  } = request.payload;

  // Validation for undefined name payload and readPage greater than pageCount
  if (!name) {
    return h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    }).code(400);
  };

  if (readPage > pageCount) {
    return h.response({
      status: "fail",
      message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    }).code(400);
  };

  const updatedAt = new Date().toISOString();
  const isFinished = readPage === pageCount;

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: finished !== undefined ? finished : isFinished,
    reading,
    updatedAt
  };

  return h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  }).code(200);

};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);

    return h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    }).code(200);
  };

  return h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  }).code(404);
};

module.exports = {
  getAllBooks,
  addBookHandler,
  getBookByIdHandler,
  updateBookhandler,
  deleteBookHandler,
};
