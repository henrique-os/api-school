const UploadsController = require("../controllers/UploadsController");
const { Router } = require("express");
const loginRequired = require("../middlewares/loginRequired");
const isAdmin = require("../middlewares/isAdmin");

const r = Router();

r.post("/", isAdmin, UploadsController.receiveImage);

module.exports = r;
