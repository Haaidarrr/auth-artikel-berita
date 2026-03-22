const { hashPassword, bandingPassword } = require('../utils/hash');
const { buatToken } = require('../utils/jwt');
const { cariUserByEmail, buatUserBaru } = require('../repositories/authRepository');

const registerService = async (dataUser) => {
  const userSudahAda = await cariUserByEmail(dataUser.email);

  if (userSudahAda) {
    const error = new Error('Email sudah terdaftar');
    error.statusCode = 400;
    throw error;
  }

  const passwordHash = await hashPassword(dataUser.password);

  const userBaru = await buatUserBaru({
    name: dataUser.name,
    email: dataUser.email,
    password: passwordHash,
    role: 'reader',
    dateOfBirth: new Date(dataUser.dateOfBirth)
  });

  return {
    id: userBaru.id,
    name: userBaru.name,
    email: userBaru.email,
    role: userBaru.role,
    dateOfBirth: userBaru.dateOfBirth
  };
};

const loginService = async (dataLogin) => {
  const userAda = await cariUserByEmail(dataLogin.email);

  if (!userAda) {
    const error = new Error('User tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  const passwordBenar = await bandingPassword(dataLogin.password, userAda.password);

  if (!passwordBenar) {
    const error = new Error('Password salah');
    error.statusCode = 401;
    throw error;
  }

  const token = buatToken(userAda);

  return token;
};

module.exports = {
  registerService,
  loginService
};