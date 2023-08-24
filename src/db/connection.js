const Sequelize = require("sequelize");
const dbConfig = require("../config/configSequelize");

const Student = require("../models/Student");
const User = require("../models/User");
const Image = require("../models/Image");

const connect = new Sequelize(dbConfig.development);
const models = [Student, User, Image];

models.forEach((model) => model.init(connect));
models.forEach((model) => model.associate && model.associate(models));
