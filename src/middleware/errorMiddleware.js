const errorMiddleware = (error, req, res, next) => {
  if (error.name === 'ZodError') {
    return res.status(400).json({
      message: error.errors[0].message
    });
  }

  return res.status(error.statusCode || 500).json({
    message: error.message || 'Terjadi error di server'
  });
};

module.exports = errorMiddleware;