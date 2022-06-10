<template>
  <table>
    <thead>
      <th>Nom</th>
      <th>Date de sortie</th>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.email">
        <td>{{ movie.title }}</td>
        <td>{{ movie.date }}</td>
        <td>
          <button class="delete-button" @click="deleteMovie(movie._id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "MoviesTable",
  props: {
    movies: Array,
  },
  emits: ["movieDeleted"],
  methods: {
    deleteMovie: function (movieId) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_BASE_URL}/movie/?id=${movieId}`)
        .then(() => {
          this.$emit("movieDeleted");
        })
        .catch((error) => {
          alert("An error occured while deleting the movie.");
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #000000;
  padding: 10px;
}

.delete-button {
  cursor: pointer;
}
</style>
