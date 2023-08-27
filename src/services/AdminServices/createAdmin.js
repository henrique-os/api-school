require("dotenv").config();
const { hash } = require("bcryptjs");
const prisma = require("../../persistence/db/prisma");

module.exports = async () => {
  console.log({
    name: process.env.ADMINUSERNAME,
    email: process.env.ADMINEMAIL,
  });
  return await prisma.user
    .create({
      data: {
        name: process.env.ADMINUSERNAME,
        email: process.env.ADMINEMAIL,
        password: await hash(process.env.ADMINPASSWORD, 8),
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
