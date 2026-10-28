const { getAllBooks } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: () => {
      h.response();
    }
  }
];

module.exports = routes;