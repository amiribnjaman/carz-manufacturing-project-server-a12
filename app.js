const express = require("express");
const app = express();
const cors = require("cors");
require('./config/db.config')

// Application level Middlewares
app.use(cors({
    origin: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Testing Route
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello world" });
});

// Hanlde Url Error
app.use((req, res, next) => {
  res.status(404).send({
    message: "Bad request",
  });
});

// Hanlde Server Errro
app.use((errro, req, res, next) => {
  res.status(500).send({
    message: "Internal problem",
  });
});

module.exports = app;