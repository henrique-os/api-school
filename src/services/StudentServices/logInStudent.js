require("dotenv").config();
const { compare } = require("bcryptjs");
const User = require("../../models/User");
const validator = require("validator");
const { sign } = require("jsonwebtoken");

module.exports = async (email, passwordSend) => {
  let code = [200];
  let msg = [];
  let tk = "";

  if (!email || !passwordSend) {
    code[0] = 400;
    msg[0] = `Credenciais Inválidas!`;
    return {
      statusCode: code[0],
      msg: msg[0],
    };
  }
  if (!validator.isEmail(email)) {
    code[0] = 400;
    msg[0] = `Email inválido!`;
    return {
      statusCode: code[0],
      msg: msg[0],
    };
  }

  let register = await User.findOne({
    where: { email },
  })
    .then(async (user) => {
      if (!user) {
        code[0] = 400;
        msg[0] = `Email inválido!`;
        return {
          statusCode: code[0],
          msg: msg[0],
        };
      }
      return compare(passwordSend, user.dataValues.password_hash)
        .then((value) => {
          console.log(`Usuário ${user.dataValues.name} entrou!`);
          if (value) {
            code[0] = 200;
            msg[0] = "Sucess";
            tk = sign(
              {
                id: user.dataValues.id,
                email: user.dataValues.email,
              },
              process.env.TOKEN_SECRET,
              {
                expiresIn: Number(process.env.TOKEN_EXP),
              }
            );
            return value;
          } else {
            code[0] = 401;
            msg[0] = "Senha inválida";
            tk = null;
            return value;
          }
        })
        .catch((value) => {
          return value;
        });
    })
    .catch((err) => {
      console.log(err);
    });

  if (register === true) {
    register = null;
    return {
      statusCode: code[0],
      msg: msg[0],
      tk,
    };
  } else {
    register = null;
    return {
      statusCode: code[0],
      msg: msg[0],
      tk: null,
    };
  }
};
