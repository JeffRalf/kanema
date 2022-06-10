const mongoose = require("mongoose");
const MovieModel = require("./models/movie");
const axios = require("axios");

async function fetchMoviesFromTheMovieDatabase() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=522d421671cf75c2cba341597d86403a&sort_by=popularity.desc&page=5&with_watch_monetization_types=flatrate`
  );

  return response.data.results;
}

async function populateMovies(movies) {
  for (var i = 0; i < movies.length; i++) {
    const newMovie = new MovieModel({
      title: movies[i].original_title,
      date: movies[i].release_date,
      desc: movies[i].overview,
      poster_url: movies[i].poster_path,
      tags: movies[i].genre_ids,
    });

    try {
      // Save the movie in database
      const createdMovie = await newMovie.save();
      console.log(createdMovie);
    } catch (error) {
      console.error(error);
    }
    try {
      // Save the movie in database
      const createdMovie = await newMovie.save();
      console.log(createdMovie);
    } catch (error) {
      console.error(error);
    }
  }
}

async function dropDataBase() {
  return mongoose.connection.db.dropCollection("movies");
}

async function populate() {
  // Connect mongoose client
  const client = await mongoose.connect(process.env.MONGO_DB_URL);

  const movies = await fetchMoviesFromTheMovieDatabase();

  //await dropDataBase();

  await populateMovies(movies);

  // disconnect mongoose client
  await client.disconnect();
}

populate()
  .then(() => {
    console.log("All done !");
  })
  .catch((error) => {
    console.error(error);
  });
