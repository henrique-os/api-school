require("./db/connection");
const express = require("express");
const studentRt = require("./routes/studentRoutes");
const userRt = require("./routes/userRoutes");
const loginUserRoutes = require("./routes/loginUserRoutes");
const uploadsRoutes = require("./routes/uploadsRoutes");
const { resolve } = require("path");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use("/student", studentRt);
    this.app.use("/user", userRt);
    this.app.use("/", loginUserRoutes);
    this.app.use("/uploads", uploadsRoutes);
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      express.static(resolve(__dirname, "..", "uploads"))
    );
  }
}

module.exports = new App().app;
