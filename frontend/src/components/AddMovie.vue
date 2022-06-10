<template>
<div>
  <div class="add-movie-title">Add new movie:</div>
  <div class="add-movie-form-container">
    <form ref="addMovieForm">
      <input
        class="add-movie-input"
        v-model="movie.title"
        type="title"
        placeholder="Title"
        required
      />
      <input
        class="add-movie-input"
        v-model="movie.date"
        placeholder="Date"
      />
      <input
        class="add-movie-input"
        v-model="movie.desc"
        placeholder="Description"
      />
      <input
        class="add-movie-input"
        v-model="movie.poster_url"
        placeholder="Poster URL"
      />
      <input list="taglist" id="tags" name="tag choice" v-model="movie.tags" />
<datalist id="taglist">
  <option value="Fantastique"/>
  <option value="Action"/>
  <option value="Aventure"/>
  <option value="Comédie"/>
  <option value="Science-Fiction"/>
  <option value="Familial"/>
  <option value="Thriller"/>
  <option value="Crime"/>
  <option value="Mystère"/>
  <option value="Romance"/>
  <option value="Musique"/>
  <option value="Animation"/>
  <option value="Horreur"/>
  <option value="Drame"/>
  <option value="Documentaire"/>
</datalist>
    </form>
    <button class="add-movie-button" @click="addMovie()">Add movie</button>
    <div v-if="movieCreationError">{{ movieCreationError }}</div>
  </div>
<div>
<p></p>
<span></span>
</div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddMovie",
  emits: ["movieAdded"],
  data: function () {
    return {
      movie: {
        date: "",
        desc: "",
        poster_url: "",
        tags: [],
        title: "",
        viewers: [],
      },
      movieCreationError: "",
    };
  },
  methods: {
    addMovie: function () {
      if (!this.$refs.addMovieForm.checkValidity()) {
        this.$refs.addMovieForm.reportValidity();
        return;
      }

      axios
        .post(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/new`, this.movie)
        .then(() => {
          this.$emit("movieAdded");
          this.movie = {
            date: "",
            desc: "",
            poster_url: "",
            tags: [],
            title: "",
            viewers: [],
          };
        })
        .catch((error) => {
          this.movieCreationError = "An error occured while creating new movie.";
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
.add-movie-title {
  margin-bottom: 10px;
}

.add-movie-form-container {
  display: flex;
  margin-bottom: 20px;
}

.add-movie-input {
  margin-right: 10px;
  padding: 5px;
}

.add-movie-button {
  cursor: pointer;
  padding: 5px;
}
</style>
