const { schemaRegister, schemaLogin } = require('../validations/authValidation');
const { registerService, loginService } = require('../services/authService');

const daftar = async (req, res, next) => {
  try {
    const dataUser = schemaRegister.parse(req.body);
    const hasilRegister = await registerService(dataUser);

    res.status(201).json({
      message: 'Register berhasil',
      data: hasilRegister
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const dataLogin = schemaLogin.parse(req.body);
    const token = await loginService(dataLogin);

    res.json({
      message: 'Login berhasil',
      token
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  daftar,
  login
};