const createUser = require("../services/UserServices/createUser");
const deleteUser = require("../services/UserServices/deleteUser");
const findUser = require("../services/UserServices/findUser");
const updateEmail = require("../services/UserServices/updateEmail");
const updateName = require("../services/UserServices/updateName");
const updatePassword = require("../services/UserServices/updatePassword");

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
      const parametro = Number(req.params.feature);
      const element = String(req.body.element);
      const email = req.headers.userEmail;
      console.log(email);

      const editEmail = async (element) => {
        const emailChange = await updateEmail({ email, newEmail: element });

        return res.status(emailChange.statusCode).json(emailChange.msg);
      };
      const editPassword = async (element) => {
        const changePassword = await updatePassword({
          newPassword: element,
          email,
        });

        return res.status(changePassword.statusCode).json(changePassword.msg);
      };
      const editName = async (element) => {
        const changeName = await updateName({ newName: element, email });
        return res.status(changeName.statusCode).json(changeName.msg);
      };
      const features = [editEmail, editPassword, editName];

      await features[parametro](element);

      return res.status(200).json();
    } catch (err) {
      res.status(400).json(null);
    }
  }
}

module.exports = new UserController();
