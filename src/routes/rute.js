// src/routes/rute.js
const {
  tambahBukuHandler,
  ambilSemuaBukuHandler,
  ambilBukuBerdasarkanIdHandler,
  perbaruiBukuBerdasarkanIdHandler,
  hapusBukuBerdasarkanIdHandler,
} = require('../handler/penangan');

const rute = [
  {
    method: 'POST',
    path: '/books',
    handler: tambahBukuHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: ambilSemuaBukuHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: ambilBukuBerdasarkanIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: perbaruiBukuBerdasarkanIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: hapusBukuBerdasarkanIdHandler,
  },
];

module.exports = rute;