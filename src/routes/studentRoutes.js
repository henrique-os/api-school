const { Router } = require("express");
const StudentController = require("../controllers/StudentController");
const loginRequired = require("../middlewares/loginRequired");
const r = Router();

r.post("/login", StudentController.studentLogin);
r.get("/:id", StudentController.getStudent);
r.get("/", StudentController.getAllStudent);
r.post("/new", StudentController.createStudent);
r.delete("/:id", StudentController.deactivateStudent);
r.put("/:id", StudentController.updateStudent);

module.exports = r;
