<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Voilà une liste de films</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank">vue-cli documentation</a>.
    </p>
    <h3>Les Films</h3>
    <p>Chercher son film</p>
    <input type="text" v-model="title" placeholder="Nom du film" />
    <div class="movie">
      <Movie
        v-for="movie in movies"
        :movie="movie"
        :id="movie.original_title"
      ></Movie>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Movie.vue";
import { onMounted } from "vue";

export default {
  name: "Home",
  components: {
    Movie,
  },
  data: function () {
    return {
      title: "",
      movies: [],
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=522d421671cf75c2cba341597d86403a&sort_by=popularity.desc&page=1&with_watch_monetization_types=flatrate`
        )
        .then((response) => {
          // Do something if call succeeded
          for (var i = 0; i < response.data.results.length; i++) {
            this.movies[i] = response.data.results[i];
            console.log(this.movies[i]);
          }
        })
        .catch((error) => {
          // Do something if call failed
          console.log(error);
        });
    },
    checkName: function (movie) {
      return (
        movie.toLowerCase().search(this.title.toLowerCase()) != -1 ||
        this.title == ""
      );
    },
    newMovies: function () {
      for (var i = 0; i < this.movies.length; i++) {
        if (this.checkName(this.movies[i].original_title)) {
          document.getElementById(this.movies[i].original_title).style.display =
            "";
        } else {
          document.getElementById(this.movies[i].original_title).style.display =
            "none";
        }
      }
    },
  },
  created() {
    this.fetchMovies();
  },
  updated() {
    this.newMovies();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}
.movie {
  display: flex;
  flex-wrap: wrap;
  width: auto;
  justify-content: center;
}

Movie {
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
