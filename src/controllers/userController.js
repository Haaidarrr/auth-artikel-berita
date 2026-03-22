const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const gantiRole = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({
        message: 'Email dan role wajib diisi'
      });
    }

    const roleYangBoleh = ['reader', 'writer', 'editor', 'admin'];

    if (!roleYangBoleh.includes(role)) {
      return res.status(400).json({
        message: 'Role tidak valid'
      });
    }

    const userAda = await db.user.findUnique({
      where: {
        email
      }
    });

    if (!userAda) {
      return res.status(404).json({
        message: 'User tidak ditemukan'
      });
    }

    const userUpdate = await db.user.update({
      where: {
        email
      },
      data: {
        role
      }
    });

    res.json({
      message: 'Role user berhasil diubah',
      data: {
        id: userUpdate.id,
        name: userUpdate.name,
        email: userUpdate.email,
        role: userUpdate.role
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  gantiRole
};