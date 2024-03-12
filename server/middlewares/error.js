class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CaseError") {
    const message = `Resource not found, Invalid: ${err.path}`;
    err = new ErrorHandler(400, message);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(409, message);
  }
  if (err.name === "JsonWebTokenError") {
    const message =
      req.path === "/logout"
        ? "User not authorized!"
        : `Json web token is invalid. Try Again`;
    err = new ErrorHandler(401, message);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json web token has expired. Try Again`;
    err = new ErrorHandler(401, message);
  }
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
