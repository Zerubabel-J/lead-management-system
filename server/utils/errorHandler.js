const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "ZodError") {
    return res.status(400).json({ message: err.errors });
  }

  res.status(500).json({ message: "Something went wrong on the server" });
};

module.exports = errorHandler;
