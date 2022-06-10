<template>
<div>
  <h1>Movies</h1>
  <AddMovie @movieAdded="fetchMovies()" />
  <MoviesTable v-if="movies.length" :movies="movies" @movieDeleted="fetchMovies()" />
  <div v-if="moviesLoadingError">{{ moviesLoadingError }}</div>
</div>
</template>

<script>
// @ is an alias to /src
import MoviesTable from "@/components/MoviesTable.vue";
import AddMovie from "@/components/AddMovie.vue";
import axios from "axios";

export default {
  name: "Movies",
  components: {
    AddMovie,
    MoviesTable,
  },
  data: function () {
    return {
      movies: [],
      moviesLoadingError: "",
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies`)
        .then((response) => {
          this.movies = response.data.users;
        })
        .catch((error) => {
          this.moviesLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    },
  },
  mounted: function () {
    this.fetchMovies();
  },
};
</script>
