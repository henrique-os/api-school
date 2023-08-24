const createStudentService = require("../services/StudentServices/createStudentService");
const deleteStudentService = require("../services/StudentServices/deleteStudentService");
const findStudent = require("../services/StudentServices/findStudent");
const updateDataValuesStudent = require("../services/StudentServices/updateDataValuesStudent");
const updateEmail = require("../services/StudentServices/updateEmail");

class StudentController {
  async getStudent(req, res) {
    try {
      const id = req.params.id;
      const findRegister = await findStudent(id);
      if (!findRegister) {
        return res.status(400).json({ err: "Não encontrado!", findRegister });
      }
      return res.status(200).json(findRegister);
    } catch (err) {
      console.log(err);

      return res.status(200).json({ err });
    }
  }
  async createStudent(req, res) {
    try {
      const { firstname, lastname, email, age, height, weight } = req.body;
      const newRegister = await createStudentService({
        firstname,
        lastname,
        email,
        age,
        height,
        weight,
      });

      return res.json(newRegister);
    } catch (err) {
      return res.status(400).json("Erro no serviço, tente mais tarde!");
    }
  }
  async updateStudent(req, res) {
    try {
      const id = req.params.id;
      const email = req.body.email;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const age = req.body.age;
      const height = req.body.height;
      const weight = req.body.weight;

      const updated = await updateDataValuesStudent(id, {
        email,
        firstname,
        lastname,
        age,
        height,
        weight,
      });
      return res.status(updated.statusCode).json(updated.msg);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }
  async deleteStudent(req, res) {
    try {
      const id = req.params.id;
      const registerDeleted = await deleteStudentService(id);
      return res.json({ registerDeleted });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

module.exports = new StudentController();
