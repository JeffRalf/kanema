<template>
  <table>
    <thead>
      <th>
        <div class="poster">
          <a :href="`http://localhost:8080/movie/?id=` + movie._id.toString()">
          <form
            :action="`http://localhost:8080/movie/?id=` + movie._id.toString()"
            method="get"
          >
            <img :src="'https://image.tmdb.org/t/p/original' + movie.poster_url" />
          </form>
        </a>
        </div>
      </th>
    </thead>
    <tbody>
      <tr>
        <td>{{ movie.title }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    movie: Object,
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

.poster:hover{
  border: 2px solid #000000;
  cursor: pointer;
}
</style>
