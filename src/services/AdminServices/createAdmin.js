require("dotenv").config();
const { hash } = require("bcryptjs");
const prisma = require("../../persistence/db/prisma");

module.exports = async ({ email, password, name }) => {
  return await prisma.user
    .create({
      data: {
        name,
        email,
        password: await hash(password, 8),
        isAdmin: true,
      },
      select: {
        name: true,
        email: true,
      },
    })
    .then((result) => {
      return {
        sCode: 201,
        result,
        err: null,
      };
    })
    .catch((err) => {
      return {
        sCode: 200,
        result: null,
        err,
      };
    });
};
