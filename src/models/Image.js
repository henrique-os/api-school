const { Sequelize, Model } = require("sequelize");
const { urlApplication } = require("../config/appConfig");

class Image extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ficar vazio!",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ficar vazio!",
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${urlApplication}/student/images/${this.getDataValue('filename')}`
          }
        }
      },
      { sequelize, tableName: "Image" }
    );

    return this;
  }
  
}

module.exports = Image;
