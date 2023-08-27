const { Router } = require("express");
const StudentController = require("../controllers/StudentController");
const loginRequired = require("../middlewares/loginRequired");
const errorController = require("../middlewares/errorController");
const r = Router();

r.get("/:id", StudentController.getStudent);
r.post("/new", StudentController.createStudent);
r.delete("/:id", StudentController.deactivateStudent);
r.put("/:id", errorController, StudentController.updateStudent);

module.exports = r;
