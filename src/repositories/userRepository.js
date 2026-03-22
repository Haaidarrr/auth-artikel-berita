const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const cariUserEmail = async (email) => {
  return await db.user.findUnique({
    where: { email }
  });
};

const updateRoleUser = async (email, role) => {
  return await db.user.update({
    where: { email },
    data: { role }
  });
};

module.exports = {
  cariUserEmail,
  updateRoleUser
};