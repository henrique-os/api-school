const { Sequelize, Model } = require("sequelize");
const { hash, compare } = require("bcryptjs");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo nome não pode ficar vazio!",
            },
            len: {
              args: [3, 255],
              msg: "Campo nome deve ter entre 3 a 255 caracteres!",
            },
          },
        },

        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Este email já está em uso, tente outro!",
          },
          validate: {
            isEmail: {
              msg: "Email inválido!!",
            },
          },
        },

        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [8, 100],
              msg: "A senha deve ter entre 8 a 100 caracteres!",
            },
          },
        },
      },
      { sequelize, tableName: "User" }
    );

    this.beforeSave(async (user) => {
      if (user.password) {
        user.password_hash = await hash(user.password, 8);
      }
    });

    return this;
  }
}

module.exports = User;
