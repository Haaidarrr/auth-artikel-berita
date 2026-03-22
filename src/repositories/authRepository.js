const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const cariUserByEmail = async (email) => {
  return await db.user.findUnique({
    where: { email }
  });
};

const buatUserBaru = async (dataUser) => {
  return await db.user.create({
    data: dataUser
  });
};

module.exports = {
  cariUserByEmail,
  buatUserBaru
};