const createUser = require("../services/UserServices/createUserService");
const deleteUser = require("../services/UserServices/deleteUserService");
const findUserService = require("../services/UserServices/findUserService");
const logInUserService = require("../services/UserServices/logInUserService");
const updateUserService = require("../services/UserServices/updateUserService");

class UserController {
  async getUser(req, res) {
    try {
      const identifierUser = req.params.id;

      if (!identifierUser) {
        return res.status(400).json({ err: `${identifierUser}` });
      }

      const tryFindUser = await findUserService(identifierUser);

      if (tryFindUser.err) {
        return res.status(tryFindUser.sCode).json(tryFindUser.err);
      }

      return res.status(tryFindUser.sCode).json(tryFindUser);
    } catch (err) {
      console.log({ err: `${err}` });
      return res.json({ err: `Erro ao busca-lo, tente mais tarde!` });
    }
  }

  async postUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await createUser({
        name,
        email,
        password,
      });

      if (!newUser) {
        res
          .status(400)
          .json({ newUser: `Não foi possivel registrar o novo usuario!` });
      }
      return res.status(201).json({ newUser });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err: "Bad Request! X-X" });
    }
  }

  async deleteUser(req, res) {
    try {
      const identifier = req.params.id;

      return res.json({
        deleted: await deleteUser(identifier),
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err: "Bad Request! X-X" });
    }
  }

  async editProfile(req, res) {
    try {
      const identifier = req.params.id;

      const { email, password, name } = req.body;

      const updatedUser = await updateUserService(identifier, {
        email,
        password,
        name,
      });

      return res.status(updatedUser.statusCode).json(updatedUser.data);
    } catch (err) {
      res.status(400).json(null);
    }
  }

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

module.exports = new UserController();
