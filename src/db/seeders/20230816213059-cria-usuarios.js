const { DataTypes, Sequelize } = require("sequelize");
const moment = require("moment-timezone");
const dateString = "2023-08-16 18:28:49.439-04";
const now = moment
  .tz(dateString, "YYYY-MM-DD HH:mm:ss.SSSZ", "America/Sao_Paulo")
  .format();

const { hash } = require("bcryptjs");
const { v4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          id: v4(),
          name: "John Doe",
          email: "carlos1@gmail.com",
          password_hash: await hash("123456", 8),
          createdAt: "2004-10-19 10:23:54+02",
          updatedAt: "2004-10-19 10:23:54+02",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User", null, {});
  },
};

// deu ruim aqui, da erro na formatação da data ERROR: time zone "gmt-0400" not recognized
// '2004-10-19 10:23:54+02' funciona porém preciso arrumar uma função que pegue a data atual e cuspa nesse formato.
