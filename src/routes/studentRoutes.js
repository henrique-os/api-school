const { Router } = require("express");
const StudentController = require("../controllers/StudentController");
const loginRequired = require("../middlewares/loginRequired");
const isAdmin = require("../middlewares/isAdmin");
const r = Router();

r.post("/login", isAdmin, StudentController.studentLogin);
r.get("/:id", isAdmin, StudentController.getStudent);
r.get("/", isAdmin, StudentController.getAllStudent);
r.delete("/:id", isAdmin, StudentController.deactivateStudent);
r.put("/:id", isAdmin, StudentController.updateStudent);

r.post("/new", isAdmin, StudentController.createStudent);

module.exports = r;
