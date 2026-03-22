const cekRole = (...roleYangBoleh) => {
  return (req, res, next) => {
    if (!roleYangBoleh.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Akses ditolak'
      });
    }

    next();
  };
};

module.exports = cekRole;