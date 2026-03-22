const express = require('express');
const router = express.Router();

const cekToken = require('../middleware/authMiddleware');
const cekRole = require('../middleware/roleMiddleware');

const {
  tambahArtikel,
  editArtikel,
  hapusArtikel,
  publishArtikel,
  cariArtikel
} = require('../controllers/artikelController');

router.get('/search', cariArtikel);

router.post('/', cekToken, cekRole('writer', 'admin'), tambahArtikel);
router.put('/:id', cekToken, cekRole('writer', 'admin'), editArtikel);
router.delete('/:id', cekToken, cekRole('writer', 'editor', 'admin'), hapusArtikel);
router.patch('/:id/publish', cekToken, cekRole('editor'), publishArtikel);

module.exports = router;