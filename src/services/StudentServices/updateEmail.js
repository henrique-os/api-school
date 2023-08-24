const Student = require("../../models/Student");

module.exports = async ({ email, newEmail }) => {
  const register = await Student.findOne({
    where: { email },
  })
    .then((user) => {
      user.update({ email: newEmail });
      return {
        statusCode: 200,
        msg: `Email alterado com sucesso!`,
      };
    })
    .catch((e) => {
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

