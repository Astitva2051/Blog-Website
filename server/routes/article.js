const express = require("express");
const articles = require("./../models/article");
const cors = require("./cors");

const articleRouter = express.Router();

articleRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    articles
      .find({})
      .then(
        (articles) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(articles);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    articles
      .deleteMany({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

// articleRouter
//   .route("/new")
//   .options(cors.corsWithOptions, (req, res) => {
//     res.sendStatus(200);
//   })
//   .post(cors.corsWithOptions, (req, res, next) => {
//     articles
//       .create(req.body)
//       .then(
//         (article) => {
//           res.statusCode = 200;
//           res.setHeader("Content-Type", "application/json");
//           res.json(article);
//         },
//         (err) => next(err)
//       )
//       .catch((err) => next(err));
//   });

articleRouter
  .route("/:slug")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    articles
      .findOne({slug: req.params.slug})
      .then(
        (article) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(article);
        },
        (err) => next(err) 
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    articles
      .findOneAndUpdate({slug: req.params.slug}, { $set: req.body }, { new: true })
      .then(
        (article) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(article);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    articles
      .findOneAndDelete({slug: req.params.slug})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = articleRouter;
