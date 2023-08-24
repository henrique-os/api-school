const Student = require("../../models/Student");

module.exports = async (id) => {
  return await Student.destroy({
    where: {
      id,
    },
  })
    .then((result) => {
      if (result) {
        return true;
      } else {
        return `Registro não encontrado!`;
      }
    })
    .catch((err) => {
      return err;
    });
};
