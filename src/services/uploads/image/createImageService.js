const { v4 } = require("uuid");
const prisma = require("../../../persistence/db/prisma");

module.exports = async ({ originalname, filename, studentId }) => {
  const image = prisma.image
    .create({
      originalname,
      filename,
      studentId,
    })
    .then((register) => {
      return {
        err: null,
        register,
        sCode: 200,
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        err,
        register: null,
        sCode: 400,
      };
    });
  return image;
};
