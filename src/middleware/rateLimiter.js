const rateLimit = require('express-rate-limit');

const batasAuth = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: 'Terlalu banyak request, coba lagi nanti'
  }
});

module.exports = {
  batasAuth
};