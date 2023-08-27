const { v4 } = require("uuid");
const prisma = require("../../../persistence/db/prisma");

module.exports = async ({ originalname, filename, studentId }) => {
  const image = prisma.image
    .create({
      id: v4(),
      originalname,
      filename,
      studentId,
    })
    .then((register) => {
      return register;
    })
    .catch((err) => {
      console.log(err);
      return `Erro`;
    });
  return image;
};
