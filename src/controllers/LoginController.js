const logInUserService = require("../services/UserServices/logInUserService");
class LoginController {
  async userLogin(req, res) {
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
      const register = await logInUserService(email, password);
      return res
        .status(register.sCode)
        .json({ msg: register.msg, token: register.token });
    } catch (err) {
      return res.status(400).json({ err: `Email não encontrado!` });
    }
  }
}

module.exports = new LoginController();
