require("dotenv").config();
const email = "riknfsmw12365@gmail.com";
const password = "123654";
const adminEmail = process.env.ADMINEMAIL;
const passwordEmail = process.env.ADMINPASSWORD;

if (email == adminEmail && password == passwordEmail) {
  return next();
} else {
  return res.status(401).json(false);
}
