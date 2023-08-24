const User = require("../../models/User");

module.exports = async (identifier) => {
  return User.findByPk(identifier);
};
