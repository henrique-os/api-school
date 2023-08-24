const { compare, hash, hashSync } = require("bcryptjs");
const Student = require("../../models/Student");

module.exports = async ({ newPassword, email }) => {
  const changePassword = await Student.findOne({ where: { email } })
    .then((user) => {
      user.update({
        password_hash: hashSync(newPassword, 8),
      });
      return {
        statusCode: 201,
        msg: `Senha alterada com sucesso!`,
      };
    })
    .catch((e) => {
      return {
        statusCode: 400,
        msg: `Password não pôde ser alterado!`,
      };
    });

    return {
      statusCode: changePassword.statusCode,
      msg: changePassword.msg,
    };
};
