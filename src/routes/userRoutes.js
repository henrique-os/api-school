const { Router } = require("express");
const UserController = require("../controllers/UserController");
const loginRequired = require("../middlewares/loginRequired");

const r = Router();

r.post("/new", UserController.postUser);
r.delete("/:id", UserController.deleteUser);
r.get("/:id", UserController.getUser);
r.put("/edit/:feature", loginRequired, UserController.editProfile);

module.exports = r;
