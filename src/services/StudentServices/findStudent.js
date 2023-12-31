const prisma = require("../../persistence/db/prisma");

module.exports = async (id) => {
  return prisma.student
    .findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        age: true,
        height: true,
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
