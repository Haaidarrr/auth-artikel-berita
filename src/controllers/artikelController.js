const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const tambahArtikel = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: 'Title dan content wajib diisi'
      });
    }

    const artikelBaru = await db.article.create({
      data: {
        title,
        content,
        published: false
      }
    });

    res.status(201).json({
      message: 'Artikel berhasil ditambahkan',
      data: artikelBaru
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const editArtikel = async (req, res) => {
  try {
    const idArtikel = Number(req.params.id);
    const { title, content } = req.body;

    const artikelAda = await db.article.findUnique({
      where: {
        id: idArtikel
      }
    });

    if (!artikelAda) {
      return res.status(404).json({
        message: 'Artikel tidak ditemukan'
      });
    }

    const artikelUpdate = await db.article.update({
      where: {
        id: idArtikel
      },
      data: {
        title,
        content
      }
    });

    res.json({
      message: 'Artikel berhasil diupdate',
      data: artikelUpdate
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const hapusArtikel = async (req, res) => {
  try {
    const idArtikel = Number(req.params.id);

    const artikelAda = await db.article.findUnique({
      where: {
        id: idArtikel
      }
    });

    if (!artikelAda) {
      return res.status(404).json({
        message: 'Artikel tidak ditemukan'
      });
    }

    await db.article.delete({
      where: {
        id: idArtikel
      }
    });

    res.json({
      message: 'Artikel berhasil dihapus'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const publishArtikel = async (req, res) => {
  try {
    const idArtikel = Number(req.params.id);

    const artikelAda = await db.article.findUnique({
      where: {
        id: idArtikel
      }
    });

    if (!artikelAda) {
      return res.status(404).json({
        message: 'Artikel tidak ditemukan'
      });
    }

    const artikelPublish = await db.article.update({
      where: {
        id: idArtikel
      },
      data: {
        published: true
      }
    });

    res.json({
      message: 'Artikel berhasil dipublish',
      data: artikelPublish
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const cariArtikel = async (req, res) => {
  try {
    const keyword = req.query.q || '';

    const hasilCari = await db.article.findMany({
      where: {
        title: {
          contains: keyword,
          mode: 'insensitive'
        }
      }
    });

    res.json({
      message: 'Data artikel berhasil diambil',
      data: hasilCari
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  tambahArtikel,
  editArtikel,
  hapusArtikel,
  publishArtikel,
  cariArtikel
};