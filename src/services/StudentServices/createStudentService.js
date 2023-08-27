const prisma = require("../../persistence/db/prisma");

const { hash } = require("bcryptjs");

module.exports = async ({ name, email, age, height, weight, password }) => {
  try {
    const newRegister = await prisma.student.create({
      data: {
        name,
        email,
        password: await hash(password, 8),
        age,
        height,
        weight,
        isActive: true,
      },
      select: {
        name: true,
        email: true,
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
