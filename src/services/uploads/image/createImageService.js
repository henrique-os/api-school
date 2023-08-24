const Image = require("../../../models/Image");
const { v4 } = require("uuid");

module.exports = async ({ originalname, filename, studentId }) => {
  const image = await Image.create({
    id: v4(),
    originalname,
    filename,
    student_image: studentId,
  });
  return image;
};
