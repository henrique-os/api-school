const { Router } = require("express");
const AdminController = require("../controllers/AdminController");
const isAdmin = require("../middlewares/isAdmin");
const validAdmin = require("../middlewares/validAdmin");

const r = Router();

r.post("/new", validAdmin, AdminController.store);

module.exports = r;
