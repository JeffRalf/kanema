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
        <a href="http://localhost:8080/">
          <input type="button" value="More details" />
        </a>
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
</style>
