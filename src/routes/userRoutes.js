const { Router } = require("express");
const UserController = require("../controllers/UserController");
const loginRequired = require("../middlewares/loginRequired");

const r = Router();

r.post("/new", UserController.postUser);
r.delete("/:id", loginRequired, UserController.deleteUser);
r.put("/edit/:feature", loginRequired, UserController.editProfile);

module.exports = r;
