const express = require("express");
const router = express.Router();
const MovieModel = require("../models/movie");

router.get("/", function (req, res) {
  MovieModel.find({})
    .populate("viewers")
    .then(function (movies) {
      console.log({ movies: movies });
      res.json({ movies: movies });
    });
});

router.post("/new", async function (req, res) {
  // Create a new movie instance
  const newMovie = new MovieModel({
    title: req.body.title,
    date: req.body.date,
    desc: req.body.desc,
    url: req.body.url,
    poster_url: req.body.poster_url,
    viewers: req.body.viewers,
  });

  try {
    // Save the movie in database
    const createdMovie = await newMovie.save();
    console.log(createdMovie);
    res.status(201).json(createdMovie);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({
        message: `Film with title "${newMovie.title}" already exists`,
      });
    } else {
      res.status(500).json({ message: "Error while creating the movie" });
    }
  }
});

router.put("/:id", async function (req, res) {
  try {
    // Save the movie in database
    /*MovieModel.findOneAndUpdate(
      { id: req.params.id },
      {
        title: req.body.title,
        date: req.body.date,
        desc: req.body.desc,
        url: req.body.url,
        poster_url: req.body.poster_url,
      }
    );*/
    const doc = await MovieModel.findById(req.params.id);
    if (req.body.title != "") {
      doc.title = req.body.title;
    }
    if (req.body.date != undefined) {
      doc.date = req.body.date;
    }
    if (req.body.desc != undefined) {
      doc.desc = req.body.desc;
    }
    if (req.body.url != undefined) {
      doc.url = req.body.url;
    }
    if (req.body.poster_url != undefined) {
      doc.poster_url = req.body.poster_url;
    }
    if (req.body.viewers != undefined) {
      doc.viewers = req.body.viewers;
    }
    await doc.save();
    MovieModel.find({ _id: req.params.id })
      .populate("viewers")
      .then(function (movies) {
        res.status(201).json({ movies: movies });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while updating the movie" });
  }
});

module.exports = router;
