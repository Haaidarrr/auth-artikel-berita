const { cariUserEmail, updateRoleUser } = require('../repositories/userRepository');

const gantiRoleService = async (email, role) => {
  if (!email || !role) {
    const error = new Error('Email dan role wajib diisi');
    error.statusCode = 400;
    throw error;
  }

  const roleYangBoleh = ['reader', 'writer', 'editor', 'admin'];

  if (!roleYangBoleh.includes(role)) {
    const error = new Error('Role tidak valid');
    error.statusCode = 400;
    throw error;
  }

  const userAda = await cariUserEmail(email);

  if (!userAda) {
    const error = new Error('User tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  const userUpdate = await updateRoleUser(email, role);

  return {
    id: userUpdate.id,
    name: userUpdate.name,
    email: userUpdate.email,
    role: userUpdate.role
  };
};

module.exports = {
  gantiRoleService
};