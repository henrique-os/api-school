const { Router } = require("express");
const LoginController = require("../controllers/LoginController");

const r = Router();

r.post("/sign-in", LoginController.assingToken);

module.exports = r;
