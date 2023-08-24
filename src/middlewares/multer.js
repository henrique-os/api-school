const multer = require("multer");
const multerConfig = require("../config/configMulter");

module.exports = multer({
  storage: multerConfig.storage,
  fileFilter: multerConfig.fileFilter,
});
