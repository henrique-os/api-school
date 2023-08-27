const { hash } = require("bcryptjs");
const prisma = require("../../persistence/db/prisma");

module.exports = async (id, { email, name, password, age, height, weight }) => {
  const register = await prisma.student
    .update({
      where: { id },
      data: {
        email,
        name,
        password: await hash(password, 8),
        age,
        height,
        weight,
      },
    })
    .then((user) => {
      return {
        user,
        statusCode: 200,
        msg: `Perfil editado com sucesso!`,
      };
    })
    .catch((e) => {
      console.log(e);
      return {
        statusCode: 400,
        msg: `Este email não está correto! verifique por favor!`,
      };
    });

  return {
    statusCode: register.statusCode,
    msg: register.msg,
  };
};
