const prisma = require("../../persistence/db/prisma");

const { hash } = require("bcryptjs");

module.exports = async ({ name, email, password }) => {
  try {
    const newRegister = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 8),
      },
    });
    return {
      newRegister,
      err: null,
    };
  } catch (err) {
    console.log(err);
    return {
      newRegister: null,
      err: err ? err : `Revise os dados enviados, e tente novamente!`,
    };
  }
};
