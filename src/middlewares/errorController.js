const errorHandler = require("../../exceptions/errorHandler");

module.exports = (error, req, res, next) => {
  errorHandler(error);
  return next();
};
