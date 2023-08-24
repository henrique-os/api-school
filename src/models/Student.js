const { Sequelize, Model } = require("sequelize");

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        firstname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 50],
              msg: `Nome precisa ter entre 3 e 50 caracteres!`,
            },
          },
        },
        lastname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 50],
              msg: `Sobrenome precisa ter entre 3 e 100 caracteres!`,
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            isEmail: {
              msg: `Precisamos de um email valido!`,
            },
          },
        },
        age: {
          type: Sequelize.INTEGER,
          defaultValue: "",
          validate: {
            isInt: {
              msg: `Preciso de um número inteiro`,
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
        },
        weight: {
          type: Sequelize.FLOAT,
        },
      },
      { sequelize, tableName: "Student" }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models[2], { foreignKey: "student_image" });
  }
}

module.exports = Student;
