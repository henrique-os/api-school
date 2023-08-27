const createStudentService = require("../services/StudentServices/createStudentService");
const deleteStudentService = require("../services/StudentServices/deleteStudentService");
const findAllStudentService = require("../services/StudentServices/findAllStudentService");
const findStudent = require("../services/StudentServices/findStudent");
const logInStudentService = require("../services/StudentServices/logInStudentService");
const updateServiceStudent = require("../services/StudentServices/updateServiceStudent");

class StudentController {
  async getAllStudent(req, res) {
    try {
      const findRegister = await findAllStudentService();
      if (!findRegister) {
        return res.status(400).json({ err: "Não encontrado!", findRegister });
      }
      return res.status(200).json(findRegister);
    } catch (err) {
      console.log(err);

      return res.status(200).json({ err });
    }
  }
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
      const { name, password, email, age, height, weight } = req.student;
      const newRegister = await createStudentService({
        name,
        password,
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
      const name = req.body.name;
      const password = req.body.password;
      const age = req.body.age;
      const height = req.body.height;
      const weight = req.body.weight;

      const updated = await updateServiceStudent(id, {
        email,
        name,
        password,
        age,
        height,
        weight,
      });
      return res.status(updated.statusCode).json(updated);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }
  async deactivateStudent(req, res) {
    // Isto não deleta o registro do banco de dados. só altera uma propriedade, mas ele fica salvo ainda em db!
    try {
      const id = req.params.id;
      const deactivate = await deleteStudentService(id);
      if (deactivate.err) {
        return res
          .status(deactivate.sCode)
          .json({ err: "Tente novamente mais tarde!" });
      } else {
        return res.json({
          name: deactivate.student.name,
          email: deactivate.student.email,
          isActive: deactivate.student.isActive,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err: "Tente novamente mais tarde!" });
    }
  }

  async studentLogin(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      if (!email || email == undefined) {
        return res.status(401).json({
          err: `O campo "Email", precisa ser preenchido! `,
        });
      }
      if (!password || password == undefined) {
        return res.status(401).json({
          err: `O campo "Senha", precisa ser preenchido! `,
        });
      }
      const register = await logInStudentService(email, password);
      return res
        .status(register.sCode)
        .json({ msg: register.msg, token: register.token });
    } catch (err) {
      return res.status(400).json({ err: `Email não encontrado!` });
    }
  }
}

module.exports = new StudentController();
