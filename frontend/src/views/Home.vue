<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/Chevre.png" />
    <h1>Liste des films</h1>
    <p>
      Chercher son film :
      <input type="text" v-model="title" placeholder="Écrire ici" />
    </p>
    <div class="movie">
      <Movie v-for="movie in movies" :movie="movie" :id="movie.title"></Movie>
    </div>
  </div>
</template>

<script>  
import axios from "axios";
import Movie from "@/components/Movie.vue";

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
    fetchMovies: async function () {
      axios
        .get(`http://localhost:3000/movies`)
        .then((response) => {
          // Do something if call succeeded
          for (var i = 0; i < response.data.movies.length; i++) {
            this.movies[i] = response.data.movies[i];
            console.log(response.data);
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
        if (this.checkName(this.movies[i].title)) {
          document.getElementById(this.movies[i].title).style.display = "";
        } else {
          document.getElementById(this.movies[i].title).style.display = "none";
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
