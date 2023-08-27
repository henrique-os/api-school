const createUser = require("../services/UserServices/createUserService");
const deleteUser = require("../services/UserServices/deleteUserService");
const findUser = require("../services/UserServices/findUserService");
const updateUserService = require("../services/UserServices/updateUserService");

class UserController {
  async getUser(req, res) {
    try {
      const identifierUser = req.params.id;
      if (!identifierUser) {
        return res.status(400).json({ err: `${identifierUser}` });
      }
      const UserAchado = await findUser(identifierUser);
      if (!UserAchado) {
        return res.status(200).json(null);
      }
      return res.status(200).json({
        name: UserAchado.dataValues.name,
        email: UserAchado.dataValues.email,
        createdAt: UserAchado.dataValues.createdAt,
      });
    } catch (err) {
      console.log({ err: `${err}` });
      return res.json({ err: `Erro ao buscar o User, tente mais tarde!` });
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
      const element = String(req.body.element);
      const { email, password, name } = req.body;

      const updatedUser = await updateUserService({ email, password, name });

      return res.status(updatedUser.statusCode).json(updatedUser.data);
    } catch (err) {
      res.status(400).json(null);
    }
  }
}

module.exports = new UserController();
