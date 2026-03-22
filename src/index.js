require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const artikelRoutes = require('./routes/artikelRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/artikel', artikelRoutes);
app.use('/user', userRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || 'Terjadi error di server'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});