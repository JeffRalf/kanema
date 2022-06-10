const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  viewer_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: "MovieModel" },
  rate: { type: Number },
});

const RatingModel = mongoose.model("RatingModel", RatingSchema, "ratings");

module.exports = RatingModel;
