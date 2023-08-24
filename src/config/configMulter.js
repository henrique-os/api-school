const multer = require("multer");
const { extname, resolve } = require("path");
const random = () => Math.floor(Math.random() * 10000 + 10000);

module.exports = {
  fileFilter: (req, file, callback) => {
    if (file.mimetype != "image/png" && file.mimetype != "image/jpeg") {
      return callback(new multer.MulterError("Arquivo inválido!"));
    }
    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, resolve(__dirname, "..", "..", "uploads", "student", "images"));
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}-${random()}${extname(file.originalname)}`);
    },
  }),
};
