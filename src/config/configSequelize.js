require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PWD,
    database: process.env.DATABASE_DBNAME,
    host: "localhost",
    dialect: process.env.DATABASE_DIALECT,
    define: {
      timestamps: true,
    },
    dialectOptions: {
      timezone: "America/Sao_Paulo",
    },
    timezone: "America/Sao_Paulo",
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PWD,
    database: process.env.DATABASE_DBNAME,
    host: "localhost",
    dialect: process.env.DATABASE_DIALECT,
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PWD,
    database: process.env.DATABASE_DBNAME,
    host: "localhost",
    dialect: process.env.DATABASE_DIALECT,
  },
  
};
