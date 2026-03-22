const express = require('express');
const router = express.Router();

const { daftar, login } = require('../controllers/authController');
const { batasAuth } = require('../middleware/rateLimiter');

router.post('/register', batasAuth, daftar);
router.post('/login', batasAuth, login);

module.exports = router;