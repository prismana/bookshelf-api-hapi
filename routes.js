const { getAllBooks, addBookHandler, deleteBookHandler, getBookByIdHandler, updateBookhandler } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookhandler,
  },
  {
    method: 'DELETE',
    path: "/books/{id}",
    handler: deleteBookHandler,
  }
];

module.exports = routes;
