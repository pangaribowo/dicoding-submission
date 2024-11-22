// src/books/buku.js
const { nanoid } = require('nanoid');

const daftarBuku = [];

/**
 * Menambahkan buku baru ke dalam koleksi
 * @param {Object} buku - Objek buku yang akan ditambahkan
 * @returns {Object} Buku yang baru dibuat
 */
const tambahBuku = (buku) => {
  const id = nanoid(16);
  const ditambahkanPada = new Date().toISOString();
  const diubahPada = ditambahkanPada;
  const selesai = buku.pageCount === buku.readPage;

  const bukuBaru = {
    ...buku,
    id,
    finished: selesai,
    insertedAt: ditambahkanPada,
    updatedAt: diubahPada,
  };

  daftarBuku.push(bukuBaru);
  return bukuBaru;
};

/**
 * Mengambil semua buku dengan filter opsional
 * @param {string} [filterNama] - Filter buku berdasarkan nama
 * @param {string} [sedangDibaca] - Filter buku berdasarkan status dibaca
 * @param {string} [selesai] - Filter buku berdasarkan status selesai
 * @returns {Array} Daftar buku yang telah difilter
 */
const ambilSemuaBuku = (filterNama, sedangDibaca, selesai) => {
  let bukuTerfilter = [...daftarBuku];

  if (filterNama) {
    bukuTerfilter = bukuTerfilter.filter((buku) => 
      buku.name.toLowerCase().includes(filterNama.toLowerCase())
    );
  }

  if (sedangDibaca !== undefined) {
    const nilaiDibaca = Number(sedangDibaca);
    if (nilaiDibaca === 0 || nilaiDibaca === 1) {
      bukuTerfilter = bukuTerfilter.filter(
        (buku) => buku.reading === Boolean(nilaiDibaca),
      );
    }
  }

  if (selesai !== undefined) {
    const nilaiSelesai = Number(selesai);
    if (nilaiSelesai === 0 || nilaiSelesai === 1) {
      bukuTerfilter = bukuTerfilter.filter(
        (buku) => buku.finished === Boolean(nilaiSelesai),
      );
    }
  }

  return bukuTerfilter.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }));
};

/**
 * Mengambil buku berdasarkan ID
 * @param {string} id - ID buku yang dicari
 * @returns {Object|undefined} Buku yang ditemukan atau undefined
 */
const ambilBukuBerdasarkanId = (id) => daftarBuku.find((buku) => buku.id === id);

/**
 * Memperbarui buku berdasarkan ID
 * @param {string} id - ID buku yang akan diperbarui
 * @param {Object} bukuDiperbarui - Data buku yang baru
 * @returns {boolean} Status keberhasilan pembaruan
 */
const perbaruiBukuBerdasarkanId = (id, bukuDiperbarui) => {
  const indeks = daftarBuku.findIndex((buku) => buku.id === id);

  if (indeks !== -1) {
    const diubahPada = new Date().toISOString();

    daftarBuku[indeks] = {
      ...daftarBuku[indeks],
      ...bukuDiperbarui,
      updatedAt: diubahPada,
      finished: bukuDiperbarui.pageCount === bukuDiperbarui.readPage,
    };

    return true;
  }

  return false;
};

/**
 * Menghapus buku berdasarkan ID
 * @param {string} id - ID buku yang akan dihapus
 * @returns {boolean} Status keberhasilan penghapusan
 */
const hapusBukuBerdasarkanId = (id) => {
  const indeks = daftarBuku.findIndex((buku) => buku.id === id);

  if (indeks !== -1) {
    daftarBuku.splice(indeks, 1);
    return true;
  }

  return false;
};

module.exports = {
  tambahBuku,
  ambilSemuaBuku,
  ambilBukuBerdasarkanId,
  perbaruiBukuBerdasarkanId,
  hapusBukuBerdasarkanId,
};