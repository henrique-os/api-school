const { Router } = require("express");
const StudentController = require("../controllers/StudentController");
const loginRequired = require("../middlewares/loginRequired");
const r = Router();

r.get("/:id", StudentController.getStudent);
r.post("/new", loginRequired, StudentController.createStudent);
r.delete("/:id", loginRequired, StudentController.deleteStudent);
r.put("/:id", loginRequired, StudentController.updateStudent);

module.exports = r;
