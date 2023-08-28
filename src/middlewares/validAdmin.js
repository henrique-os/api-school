const { decode } = require("jsonwebtoken");
const secrets = require("../../secrets");

module.exports = async (req, res, next) => {
  const { token } = req.headers;
  const { email, password, name } = req.body;
  if (!token) {
    return null;
  }
  const decoding = decode(token);
  if (
    decoding.email === secrets.isAdmin.email &&
    decoding.name === secrets.isAdmin.name &&
    decoding.password === secrets.isAdmin.password &&
    decoding.secret === secrets.isAdmin.secret
  ) {
    req.isAdmin = { name, email, password };
    return next();
  } else {
    return res.status(400).json({
      isAdmin: false,
      msg: `Failed!`,
    });
  }
};
