const { z } = require('zod');

const schemaRegister = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string()
    .min(6, 'Password minimal 6 karakter')
    .regex(/[A-Z]/, 'Password harus ada huruf kapital')
    .regex(/[0-9]/, 'Password harus ada angka'),
  dateOfBirth: z.string().min(1, 'Tanggal lahir wajib diisi')
});

const schemaLogin = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi')
});

module.exports = {
  schemaRegister,
  schemaLogin
};