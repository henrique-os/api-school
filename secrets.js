require("dotenv").config();

module.exports = {
  isAdmin: {
    email: process.env.ADMINEMAIL,
    name: process.env.ADMINNAME,
    password: process.env.ADMINPASSWORD,
    secret: process.env.TOKEN_SECRET_ADMIN,
  },
};
