require("dotenv").config();
const { compare } = require("bcryptjs");
const User = require("../../models/User");
const validator = require("validator");
const { sign } = require("jsonwebtoken");

module.exports = async (email, passwordSend) => {
  if (!email || !passwordSend) {
    return `Credenciais Inválidas!`;
  }
  if (!validator.isEmail(email)) {
    return `Email inválido`;
  }

  let register = await User.findOne({
    where: { email },
  });

  if (!register) {
    return;
  }
  const validePassword = await compare(
    passwordSend,
    register.dataValues.password_hash
  );
  if (validePassword === true) {
    const token = sign(
      {
        userId: register.dataValues.id,
        email: register.dataValues.email,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: Number(process.env.TOKEN_EXP) }
    );
    return token;
  }
  return `Credenciais Inválidas!`;
};
