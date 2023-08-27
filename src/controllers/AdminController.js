const createAdmin = require("../services/AdminServices/createAdmin");

class AdminController {
  async store(req, res) {
    const create = await createAdmin();
    if (create.err) {
      return res.status(create.err).json(create.err);
    }
    return res.status(create.sCode).json(create.result)
  }
}

module.exports = new AdminController();
