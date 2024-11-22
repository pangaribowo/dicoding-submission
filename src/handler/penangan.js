// src/handler/penangan.js
const {
  tambahBuku,
  ambilSemuaBuku,
  ambilBukuBerdasarkanId,
  perbaruiBukuBerdasarkanId,
  hapusBukuBerdasarkanId,
} = require('../books/buku');

const tambahBukuHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const bukuBaru = tambahBuku({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  });

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: bukuBaru.id,
    },
  }).code(201);
};

const ambilSemuaBukuHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  const buku = ambilSemuaBuku(name, reading, finished);

  return h.response({
    status: 'success',
    data: {
      books: buku,
    },
  }).code(200);
};

const ambilBukuBerdasarkanIdHandler = (request, h) => {
  const { bookId } = request.params;
  const buku = ambilBukuBerdasarkanId(bookId);

  if (!buku) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book: buku,
    },
  }).code(200);
};

const perbaruiBukuBerdasarkanIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const berhasil = perbaruiBukuBerdasarkanId(bookId, {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  });

  if (!berhasil) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};

const hapusBukuBerdasarkanIdHandler = (request, h) => {
  const { bookId } = request.params;
  const berhasil = hapusBukuBerdasarkanId(bookId);

  if (!berhasil) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};

module.exports = {
  tambahBukuHandler,
  ambilSemuaBukuHandler,
  ambilBukuBerdasarkanIdHandler,
  perbaruiBukuBerdasarkanIdHandler,
  hapusBukuBerdasarkanIdHandler,
};