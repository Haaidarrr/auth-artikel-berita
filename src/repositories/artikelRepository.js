const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const buatArtikelBaru = async (dataArtikel) => {
  return await db.article.create({
    data: dataArtikel
  });
};

const cariArtikelById = async (id) => {
  return await db.article.findUnique({
    where: { id }
  });
};

const updateArtikelById = async (id, dataArtikel) => {
  return await db.article.update({
    where: { id },
    data: dataArtikel
  });
};

const hapusArtikelById = async (id) => {
  return await db.article.delete({
    where: { id }
  });
};

const cariArtikelDariKeyword = async (keyword) => {
  return await db.article.findMany({
    where: {
      title: {
        contains: keyword,
        mode: 'insensitive'
      }
    }
  });
};

module.exports = {
  buatArtikelBaru,
  cariArtikelById,
  updateArtikelById,
  hapusArtikelById,
  cariArtikelDariKeyword
};