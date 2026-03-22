const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const { hashPassword, bandingPassword } = require('../utils/hash');
const { buatToken } = require('../utils/jwt');
const { schemaRegister, schemaLogin } = require('../validations/authValidation');

const daftar = async (req, res) => {
  try {
    const dataUser = schemaRegister.parse(req.body);

    const userSudahAda = await db.user.findUnique({
      where: {
        email: dataUser.email
      }
    });

    if (userSudahAda) {
      return res.status(400).json({
        message: 'Email sudah terdaftar'
      });
    }

    const passwordHash = await hashPassword(dataUser.password);

    const userBaru = await db.user.create({
      data: {
        name: dataUser.name,
        email: dataUser.email,
        password: passwordHash,
        role: 'reader',
        dateOfBirth: new Date(dataUser.dateOfBirth)
      }
    });

    res.status(201).json({
      message: 'Register berhasil',
      data: {
        id: userBaru.id,
        name: userBaru.name,
        email: userBaru.email,
        role: userBaru.role,
        dateOfBirth: userBaru.dateOfBirth
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const dataLogin = schemaLogin.parse(req.body);

    const userAda = await db.user.findUnique({
      where: {
        email: dataLogin.email
      }
    });

    if (!userAda) {
      return res.status(404).json({
        message: 'User tidak ditemukan'
      });
    }

    const passwordBenar = await bandingPassword(
      dataLogin.password,
      userAda.password
    );

    if (!passwordBenar) {
      return res.status(401).json({
        message: 'Password salah'
      });
    }

    const token = buatToken(userAda);

    res.json({
      message: 'Login berhasil',
      token: token
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  daftar,
  login
};