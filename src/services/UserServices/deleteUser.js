const User = require("../../models/User");

module.exports = async (id) => {
  return await User.destroy({
    where: {
      id,
    },
  });
};
