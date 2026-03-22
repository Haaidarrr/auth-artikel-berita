const { gantiRoleService } = require('../services/userService');

const gantiRole = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const hasilUpdate = await gantiRoleService(email, role);

    res.json({
      message: 'Role user berhasil diubah',
      data: hasilUpdate
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  gantiRole
};