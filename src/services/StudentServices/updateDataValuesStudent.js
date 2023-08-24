const Student = require("../../models/Student");

module.exports = async (
  id,
  { email, firstname, lastname, age, height, weight }
) => {
  const register = await Student.findByPk(id)
    .then((user) => {
      user.update({ email, firstname, lastname, age, height, weight });
      return {
        user,
        statusCode: 200,
        msg: `Perfil editado com sucesso!`,
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
