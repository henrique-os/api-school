const prisma = require("../../persistence/db/prisma");

module.exports = async (identifier) => {
  return prisma.student
    .findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        isActive: true,
      },
    })
    .catch((err) => {
      console.log(err);
      return {
        err,
        register: null,
      };
    });
};
