const User = require("../../models/User");

module.exports = async ({ newName, email }) => {
  const register = await User.findOne({
    where: { email },
  })
    .then((user) => {
      user.update({ name: newName });
      return {
        msg: "Nome alterado com sucesso!",
        statusCode: 201
      }
    })
    .catch((e) => {
      console.log(e);
      return {
        msg: "Nome não pôde ser alterado!",
        statusCode: 400
      }
    });

  return {
    statusCode: register.statusCode,
    msg: register.msg,
  };
};
