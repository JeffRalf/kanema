<template>
  <table>
    <thead>
      <th>
        <img :src="'https://image.tmdb.org/t/p/original' + movie.poster_path" />
      </th>
    </thead>
    <tbody>
      <tr>
        <td>{{ movie.original_title }}</td>
        <div>Rate: {{ movie.vote_average }}</div>
        <div class="rating">
          <!--
   --><a href="#5" title="Donner 5 étoiles">☆</a
          ><!--
   --><a href="#4" title="Donner 4 étoiles">☆</a
          ><!--
   --><a href="#3" title="Donner 3 étoiles">☆</a
          ><!--
   --><a href="#2" title="Donner 2 étoiles">☆</a
          ><!--
   --><a href="#1" title="Donner 1 étoile">☆</a>
        </div>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    movie: Object,
  },
  methods: {
    increment: function () {
      this.movie.vote_average += 0.1;
    },
    reduce: function () {
      this.movie.vote_average -= 0.1;
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

img {
  width: 8rem;
  border-radius: 2rem;
}

th,
td {
  border: 0px solid #000000;
  padding: 10px;
  width: 8rem;
  display: flex;
  flex-wrap: column;
  justify-content: center;
}

.rating a {
  float: right;
  color: #aaa;
  text-decoration: none;
  font-size: 3em;
  transition: color 0.4s;
}
.rating a:hover,
.rating a:focus,
.rating a:hover ~ a,
.rating a:focus ~ a {
  color: orange;
  cursor: pointer;
}
</style>
