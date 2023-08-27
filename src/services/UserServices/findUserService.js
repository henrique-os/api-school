const prisma = require("../../persistence/db/prisma");

module.exports = async (id) => {
  const findUserService = prisma.user
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
    .then((register) => {
      return {
        register,
        err: null,
        sCode: 200,
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        register: null,
        err,
        sCode: 400,
      };
    });

  return findUserService;
};
