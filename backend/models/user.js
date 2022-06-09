const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

UserSchema.virtual("watchedMovies", {
  ref: "MovieModel",
  localField: "_id", // The user _id should match the viewers field in movies
  foreignField: "viewers",
});

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;
