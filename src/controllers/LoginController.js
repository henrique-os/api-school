const logInUser = require("../services/UserServices/logInUser");

class LoginController {
  async assingToken(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      if (!email || email == undefined) {
        return res.status(401).json({
          err: `O campo "Email", precisa ser preenchido! `,
        });
      }
      if (!password || password == undefined) {
        return res.status(401).json({
          err: `O campo "Senha", precisa ser preenchido! `,
        });
      }
      const register = await logInUser(email, password);
      console.log(register);
      return res.status(200).json({ register });
    } catch (err) {
      return res.status(400).json({ err: `Email não encontrado!` });
    }
  }
}

module.exports = new LoginController();
