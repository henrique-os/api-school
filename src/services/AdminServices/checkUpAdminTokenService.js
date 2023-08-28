function sign() {
  const token = sign(
    {
      email: process.env.ADMINEMAIL,
      name: process.env.ADMINNAME,
      password: process.env.ADMINPASSWORD,
      secret: process.env.TOKEN_SECRET_ADMIN,
    },
    process.env.TOKEN_SECRET,
    {
      algorithm: "HS256",
    }
  );
  return token;
}

console.log(token);
