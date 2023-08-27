const prisma = require("../../persistence/db/prisma");

module.exports = async () => {
  return await prisma.student.findMany();
};
