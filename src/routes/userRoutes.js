const express = require('express');
const router = express.Router();

const cekToken = require('../middleware/authMiddleware');
const cekRole = require('../middleware/roleMiddleware');
const { gantiRole } = require('../controllers/userController');

router.patch('/role', cekToken, cekRole('admin'), gantiRole);

module.exports = router;