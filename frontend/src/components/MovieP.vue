<template>
  <table>
    <thead>
      <th>
        <h2>{{ movie.title }}</h2>
      </th>
    </thead>
    <tbody>
      <tr>
        <td>
          <p>{{ movie.date }}</p>
        </td>
      </tr>
      <tr>
        <td>
          <img
            :src="'https://image.tmdb.org/t/p/original' + movie.poster_url"
          />
        </td>
      </tr>
      <tr>
        <td>
          <p>
            {{ movie.desc }}
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <form>
            <input type="range" min="0" max="5" step="1" />
          </form>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      value: 0,
    };
  },
  props: {
    movie: Object,
  },
  methods: {
    updateRating: async function () {
      try {
        const res = axios.post(
          `http://localhost:3000/ratings/` +
            this.movie._id +
            "/" +
            "62a0a80e225718d475c4e83d",
          { rate: this.value }
        );
        res.data.json;
        res.data.headers["Content-Type"];
      } catch (error) {}
      const res = await axios.put(
        `http://localhost:3000/ratings/` +
          this.movie._id +
          "/" +
          "62a0a80e225718d475c4e83d",
        { rate: this.value }
      );
      res.data.json;
      res.data.headers["Content-Type"];
    },
  },
  updated() {
    this.updateRating();
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

img {
  width: 16rem;
  border-radius: 2rem;
}

th,
td {
  border: 0px solid #000000;
  padding: 10px;
  width: 20rem;
  display: flex;
  flex-wrap: column;
  justify-content: center;
}
</style>
