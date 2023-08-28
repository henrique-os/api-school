const errorHandler = require("../../exceptions/errorHandler");
const createAdmin = require("../services/AdminServices/createAdmin");

class AdminController {
  async store(req, res) {
    try {
      const { email, password, name } = req.isAdmin;
      const create = await createAdmin({ name, email, password });
      if (create.err) {
        return res.status(create.err).json(create.err);
      }
      return res.status(create.sCode).json(create.result);
    } catch (err) {
      errorHandler(err);
      res.status(400).json({ err: `Tente novamente mais tarde` });
    }
  }
}

module.exports = new AdminController();
