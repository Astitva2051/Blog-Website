const express = require("express");
const articles = require("./../models/article");
const cors = require("./cors");

const createRouter = express.Router();

createRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    // console.log(req.body);
    articles
      .create(req.body)
      .then(
        (article) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(article);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

  module.exports = createRouter;