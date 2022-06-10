<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/Chevre.png" />
    <MovieP :movie="movie" :id="movie.title"></MovieP>
  </div>
</template>

<script>
import axios from "axios";
import MovieP from "@/components/MovieP.vue";

export default {
  components: {
    MovieP,
  },
  data: function () {
    return {
      movie: Object,
    };
  },
  methods: {
    fetchMovie: async function () {
      var paramString = window.location.search.split("=")[1];
      console.log(`http://localhost:3000/movies/` + paramString);
      axios
        .get(`http://localhost:3000/movies/` + paramString)
        .then((response) => {
          this.movie = response.data;
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching the movie.";
          console.error(error);
        });
    },
  },
  created() {
    this.fetchMovie();
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  width: auto;
  justify-content: center;
}
.movie {
  display: flex;
  flex-wrap: wrap;
  width: auto;
  justify-content: center;
}

MovieP {
  width: auto;
}

img {
  width: 10%;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
table {
  align-self: flex-start;
}

td {
  align-content: flex-end;
}

a {
  color: #42b983;
}
</style>
