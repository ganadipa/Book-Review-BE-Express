export const errorHandler = (err, req, res, next) => {
  console.log("Im at error handler 1");
  console.log("Im at error handler 2");

  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    data: null,
  });
};
