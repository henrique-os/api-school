const Student = require("../../models/Student");
const { v4 } = require("uuid");

module.exports = async ({
  firstname,
  lastname,
  email,
  age,
  height,
  weight,
}) => {
  try {
    const newRegister = await Student.create({
      id: v4(),
      firstname,
      lastname,
      email,
      age,
      height,
      weight,
    });

    return {
      id: newRegister.dataValues.id,
      firstname: newRegister.dataValues.firstname,
      email: newRegister.dataValues.email,
    };
  } catch (err) {
    console.log(err);
    return `Verifique os dados, e tente novamente mais tarde!`;
  }
};
