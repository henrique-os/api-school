const Student = require("../../models/Student");
const Image = require("../../models/Image");

module.exports = async (identifier) => {
  return Student.findByPk(identifier, {
    attributes: [`firstname`, `lastname`, `email`, `age`, `height`, `weight`],
    order: [
      ["id", "DESC"],
      [Image, "createdAt", "DESC"],
    ],
    include: {
      model: Image,
      attributes: [`filename`, `url`],
    },
  })
    .then((register) => {
      return register;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
