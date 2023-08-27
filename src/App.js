const express = require("express");
const studentRt = require("./routes/studentRoutes");
const userRt = require("./routes/userRoutes");
const uploadsRoutes = require("./routes/uploadsRoutes");
const { resolve } = require("path");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use("/", (req, res) => {
      return res.send(`<!DOCTYPE html>
      <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Api Escola</title>
      </head>
      <body>
          <h1>Escola</h1>
          <h1>Bem Vindo</h1>
      </body>
      </html>`);
    });
    // this.app.use("/student", studentRt);
    // this.app.use("/user", userRt);
    // this.app.use("/uploads", uploadsRoutes);
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, "..", "uploads")));
  }
}

module.exports = new App().app;
