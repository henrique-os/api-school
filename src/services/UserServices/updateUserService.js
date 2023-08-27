const { hash } = require("bcryptjs");
const prisma = require("../../persistence/db/prisma");

module.exports = async (id, { name, email, password }) => {
  const register = prisma.user
    .update({
      where: { id },
      data: {},
    })
    .then((user) => {
      user.update({ name, email, password: hash(password, 8) });
      return {
        statusCode: 201,
        msg: `Sucess!`,
      };
    })
    .catch((e) => {
      return {
        statusCode: 400,
        msg: `verifique, e tente novamente mais tarde!`,
      };
    });

  return {
    statusCode: register.statusCode,
    msg: register.msg,
  };
};
