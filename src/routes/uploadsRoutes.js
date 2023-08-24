const UploadsController = require("../controllers/UploadsController");
const { Router } = require("express");
const loginRequired = require("../middlewares/loginRequired");

const r = Router();

r.post("/", loginRequired, UploadsController.receiveImage);

module.exports = r;
