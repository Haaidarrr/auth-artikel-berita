const {
  buatArtikelBaru,
  cariArtikelById,
  updateArtikelById,
  hapusArtikelById,
  cariArtikelDariKeyword
} = require('../repositories/artikelRepository');

const tambahArtikelService = async (title, content) => {
  if (!title || !content) {
    const error = new Error('Title dan content wajib diisi');
    error.statusCode = 400;
    throw error;
  }

  return await buatArtikelBaru({
    title,
    content,
    published: false
  });
};

const editArtikelService = async (idArtikel, title, content) => {
  const artikelAda = await cariArtikelById(idArtikel);

  if (!artikelAda) {
    const error = new Error('Artikel tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return await updateArtikelById(idArtikel, { title, content });
};

const hapusArtikelService = async (idArtikel) => {
  const artikelAda = await cariArtikelById(idArtikel);

  if (!artikelAda) {
    const error = new Error('Artikel tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  await hapusArtikelById(idArtikel);
};

const publishArtikelService = async (idArtikel) => {
  const artikelAda = await cariArtikelById(idArtikel);

  if (!artikelAda) {
    const error = new Error('Artikel tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return await updateArtikelById(idArtikel, { published: true });
};

const cariArtikelService = async (keyword) => {
  return await cariArtikelDariKeyword(keyword);
};

module.exports = {
  tambahArtikelService,
  editArtikelService,
  hapusArtikelService,
  publishArtikelService,
  cariArtikelService
};