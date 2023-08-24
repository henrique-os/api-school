require("dotenv").config();
const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.auth;
    if (typeof token != "string") {
      return res.status(401).json({ err: `Login Required!` });
    }
    if (!token) {
      return res.status(401).json({ err: `Login Required!` });
    }
    const secret = String(process.env.TOKEN_SECRET);
    const verifyToken = verify(token, secret);
    if (!verifyToken) {
      return res.status(401).json({ err: `Login Required!` });
    } else {
      const { email, id } = verifyToken;
      req.headers.userId = String(id);
      req.headers.userEmail = String(email);

      return next();
    }
  } catch (err) {
    return res.status(401).json({ err: `Login Required!` });
  }
};
