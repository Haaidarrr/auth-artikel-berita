const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const db = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin12345', 10);

  const adminAda = await db.user.findUnique({
    where: {
      email: 'admin@example.com'
    }
  });

  if (!adminAda) {
    await db.user.create({
      data: {
        name: 'Administrator',
        email: 'admin@example.com',
        password: passwordHash,
        role: 'admin',
        dateOfBirth: new Date('2000-01-10')
      }
    });

    console.log('Admin berhasil dibuat');
  } else {
    console.log('Admin sudah ada');
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await db.$disconnect();
  });