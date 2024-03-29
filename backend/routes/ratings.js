const express = require("express");
const router = express.Router();
const RatingModel = require("../models/rating");

router.get("/", function (req, res) {
  RatingModel.find({})
    .populate("viewer_id")
    .populate("movie_id")
    .then(function (ratings) {
      res.json({ ratings: ratings });
    });
});

router.get("/:movie_id/:viewer_id", async function (req, res) {
  var rate = await RatingModel.findOne({
    movie_id: req.params.movie_id,
    viewer_id: req.params.viewer_id,
  });
  res.json(rate);
});

router.post("/new", async function (req, res) {
  // Create a new movie instance
  const newRating = new RatingModel({
    viewer_id: req.body.viewer_id,
    movie_id: req.body.movie_id,
    rate: req.body.rate,
  });

  try {
    // Save the movie in database
    const createdRating = await newRating.save();
    res.status(201).json(createdRating);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({
        message: `This rating already exists`,
      });
    } else {
      res.status(500).json({ message: "Error while creating the rating" });
    }
  }
});

router.post("/:movie_id/:viewer_id/:rate", async function (req, res) {
  // Create a new movie instance
  const newRating = new RatingModel({
    viewer_id: req.params.viewer_id,
    movie_id: req.params.movie_id,
    rate: req.params.rate,
  });

  try {
    // Save the movie in database
    const createdRating = await newRating.save();
    res.status(201).json(createdRating);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({
        message: `This rating already exists`,
      });
    } else {
      res.status(500).json({ message: "Error while creating the rating" });
    }
  }
});

router.put("/:movie_id/:viewer_id/:rate", async function (req, res) {
  try {
    const doc = await RatingModel.findOne({
      movie_id: req.params.movie_id,
      viewer_id: req.params.viewer_id,
    });
    console.log(doc);
    doc.rate = req.params.rate;
    console.log(req.params.rate);
    await doc.save();
    RatingModel.find({})
      .populate("viewer_id")
      .populate("movie_id")
      .then(function (ratings) {
        res.json({ ratings: ratings });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while updating the rating" });
  }
});

module.exports = router;
