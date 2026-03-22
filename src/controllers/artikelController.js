const {
  tambahArtikelService,
  editArtikelService,
  hapusArtikelService,
  publishArtikelService,
  cariArtikelService
} = require('../services/artikelService');

const tambahArtikel = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const artikelBaru = await tambahArtikelService(title, content);

    res.status(201).json({
      message: 'Artikel berhasil ditambahkan',
      data: artikelBaru
    });
  } catch (error) {
    next(error);
  }
};

const editArtikel = async (req, res, next) => {
  try {
    const idArtikel = Number(req.params.id);
    const { title, content } = req.body;

    const artikelUpdate = await editArtikelService(idArtikel, title, content);

    res.json({
      message: 'Artikel berhasil diupdate',
      data: artikelUpdate
    });
  } catch (error) {
    next(error);
  }
};

const hapusArtikel = async (req, res, next) => {
  try {
    const idArtikel = Number(req.params.id);

    await hapusArtikelService(idArtikel);

    res.json({
      message: 'Artikel berhasil dihapus'
    });
  } catch (error) {
    next(error);
  }
};

const publishArtikel = async (req, res, next) => {
  try {
    const idArtikel = Number(req.params.id);
    const artikelPublish = await publishArtikelService(idArtikel);

    res.json({
      message: 'Artikel berhasil dipublish',
      data: artikelPublish
    });
  } catch (error) {
    next(error);
  }
};

const cariArtikel = async (req, res, next) => {
  try {
    const keyword = req.query.q || '';
    const hasilCari = await cariArtikelService(keyword);

    res.json({
      message: 'Data artikel berhasil diambil',
      data: hasilCari
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  tambahArtikel,
  editArtikel,
  hapusArtikel,
  publishArtikel,
  cariArtikel
};