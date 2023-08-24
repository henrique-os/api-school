const User = require("../../models/User");
const { v4 } = require("uuid");

module.exports = async ({ name, email, password }) => {
  try {
    const newRegister = await User.create({
      id: v4(),
      name,
      email,
      password,
    });

    return newRegister;
  } catch (error) {
    console.log(error);
    if (error) {
      return error.errors.map((e) => e.message);
    }
    return error;
  }
};
