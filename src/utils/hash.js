const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const bandingPassword = async (passwordBiasa, passwordHash) => {
  return await bcrypt.compare(passwordBiasa, passwordHash);
};

module.exports = {
  hashPassword,
  bandingPassword
};