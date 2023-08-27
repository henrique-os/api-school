require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const adminEmail = req.body.adminEmail;
    const adminPassword = req.body.adminPassword;
    const emailLocal = process.env.ADMINEMAIL;
    const passwordLocal = process.env.ADMINPASSWORD;

    if (adminEmail == emailLocal && passwordLocal == adminPassword) {
      const { name, email, password, age, height, weight } = req.body;
      {
        name, password, email, age, height, weight;
      }
      req.user = {
        name,
        email,
        password,
      };
      req.student = { name, password, email, age, height, weight };
      next();
    } else {
      return res.status(404).json({ err: `Not Found` });
    }
  } catch (err) {
    return res.status(404).json({ err: `Not Found` });
  }
};
