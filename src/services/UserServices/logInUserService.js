require("dotenv").config();
const prisma = require("../../persistence/db/prisma");
const { compare } = require("bcryptjs");
const validator = require("validator");
const { sign } = require("jsonwebtoken");

module.exports = async (email, password) => {
  if (!email || !password) {
    return `Credenciais Inválidas!`;
  }
  if (!validator.isEmail(email)) {
    return `Email inválido`;
  }

  let register = prisma.user
    .findUnique({
      where: { email },
    })
    .then(async (register) => {
      const validePassword = await compare(password, register.password)
        .then((value) => {
          if (value === true) {
            return {
              value,
            };
          } else {
            return {
              msg: `Senha incorreta! tente novamente...`,
              sCode: 401,
            };
          }
        })
        .catch((err) => {
          console.log(`${err} => Email errado!`);
          return {
            msg: `Tente novamente!`,
            sCode: 400,
          };
        });

      if (validePassword.value === true) {
        const token = sign(
          {
            userId: register.id,
            email: register.email,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: Number(process.env.TOKEN_EXP) }
        );
        return {
          token,
          sCode: 200,
        };
      }
      // aqui é senha errada
      return {
        sCode: 400,
        msg: `Password e ou senha Inválidos!`,
      };
    })
    .catch((err) => {
      // aqui é email errado, erro do prisma em não achar o email
      return { sCode: 401, msg: `Password e ou senha Inválidos!` };
    });

  return register;
};
