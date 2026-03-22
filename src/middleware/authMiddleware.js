const jwt = require('jsonwebtoken');

const cekToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: 'Token tidak ada'
    });
  }

  const token = header.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Format token salah'
    });
  }

  try {
    const hasilToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = hasilToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token tidak valid'
    });
  }
};

module.exports = cekToken;