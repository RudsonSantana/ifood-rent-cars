"use strict";
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const salt = process.env.PASSWORD_SALT;

const encrypt = (value) => {
  return crypto.pbkdf2Sync(value, salt, 100000, 64, 'sha512').toString('hex');
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("employees", [
      {
        id: uuidv4(),
        name: "Admin",
        cpf: "12345678901",
        email: "admin@gmail.com",
        password: encrypt("Ab1234+"),
        phone: "84998764523",
        licenseCategory: "123e4567-e89b-12d3-a456-426614174001",
        position: "123e4567-e89b-12d3-a456-426614174000",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employees", null, {});
  },
};
