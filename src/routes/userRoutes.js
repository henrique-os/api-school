const { Router } = require("express");
const UserController = require("../controllers/UserController");
const loginRequired = require("../middlewares/loginRequired");
const isAdmin = require("../middlewares/isAdmin");

const r = Router();

r.post("/login", isAdmin, UserController.userLogin);
r.delete("/:id", isAdmin, UserController.deleteUser);
r.get("/:id", isAdmin, UserController.getUser);
r.put("/edit/:feature", isAdmin, UserController.editProfile);

r.post("/new", isAdmin, UserController.postUser);

module.exports = r;
