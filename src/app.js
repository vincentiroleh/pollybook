//require the dotenv
require("dotenv").config();
// Import modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const routes = require('./api/router')

const app = express();

// setup cors / helmet
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(logger("dev"));

// setup body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// connect the database
require("./database/db").connect();

// Router
app.get("/", (req, res) => res.json({ message: "API to the cloud... 🚀" }));


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
