const express = require("express");
const app = express();
const cors = require("cors");
require('./config/db.config')
const userRouter = require('./route/user.router')

/**
 * 
 * Application level Milddlewares
 * 
 **/
app.use(cors({
    origin: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/**
 * 
 * Application level routes
 * 
 **/
app.use('/api/v1/user', userRouter)


/**
 * 
 * Testing routes
 * 
 **/
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello world" });
});


/**
 * 
 * Error handling routes
 * 
 **/
app.use((req, res, next) => {
  res.status(404).send({
    message: "Bad request",
  });
});


/**
 * 
 * Server error handling routes
 * 
 **/
app.use((errro, req, res, next) => {
  res.status(500).send({
    message: "Internal problem",
  });
});

module.exports = app;