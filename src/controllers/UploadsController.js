const multer = require("multer");
const multerConfig = require("../config/configMulter");
const createImageService = require("../services/uploads/image/createImageService");

const upload = multer({
  storage: multerConfig.storage,
  fileFilter: multerConfig.fileFilter,
}).single("image");

class UploadsController {
  receiveImage(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ err: "Imagem precisa ser PNG ou JPEG!" });
      }
      try {
        const { originalname, filename } = req.file;
        const studentId = req.body.studentId;
        console.log(`${studentId} studentId`);

        const newImage = await createImageService({
          originalname,
          filename,
          studentId,
        });

        if (!newImage.err) {
          return res.status(newImage.sCode).json(newImage.register);
        }
        console.log(newImage.err);
        return res.status(newImage.sCode).json({
          err: `Tente novamente mais tarde!`,
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err: "Tente novamente mais tarde!" });
      }
    });
  }
}

module.exports = new UploadsController();
