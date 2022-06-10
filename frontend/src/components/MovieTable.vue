<template>
  <table>
    <thead>
      <th>Nom</th>
      <th>Date de sortie</th>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.email">
        <td>{{ user.email }}</td>
        <td>{{ user.firstName }}</td>
        <td>
          <button class="delete-button" @click="deleteUser(user._id)">
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
  name: "UsersTable",
  props: {
    users: Array,
  },
  emits: ["userDeleted"],
  methods: {
    deleteUser: function (userId) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_BASE_URL}/users/${userId}`)
        .then(() => {
          this.$emit("userDeleted");
        })
        .catch((error) => {
          alert("An error occured while deleting the user.");
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
