const { Router } = require("express");
const AdminController = require("../controllers/AdminController");
const isAdmin = require("../middlewares/isAdmin");

const r = Router();

// r.post("/new", isAdmin, AdminController.store);

module.exports = r;
