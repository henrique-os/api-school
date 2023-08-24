"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Image", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      studentId: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "Student",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Image");
  },
};
